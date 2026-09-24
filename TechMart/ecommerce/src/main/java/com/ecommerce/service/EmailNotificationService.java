package com.ecommerce.service;

import com.ecommerce.entity.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.sesv2.SesV2Client;
import software.amazon.awssdk.services.sesv2.model.*;

import java.text.NumberFormat;
import java.util.Locale;

@Service
public class EmailNotificationService {

    private static final Logger logger =
            LoggerFactory.getLogger(EmailNotificationService.class);

    private final SesV2Client sesV2Client;
    private final boolean enabled;
    private final String from;

    public EmailNotificationService(
            SesV2Client sesV2Client,
            @Value("${app.mail.enabled:false}") boolean enabled,
            @Value("${app.ses.from-email:}") String from
    ) {
        this.sesV2Client = sesV2Client;
        this.enabled = enabled;
        this.from = from;
    }

    public void sendOrderCreated(Order order) {
        send(
                order,
                "Xác nhận đơn hàng " + order.getId(),
                "Xin chào " + order.getCustomerFullName() + ",\n\n"
                        + "TechMart đã tiếp nhận đơn hàng " + order.getId() + ".\n"
                        + "Tổng tiền: " + formatMoney(order.getTotal()) + "\n"
                        + "Phương thức thanh toán: "
                        + paymentMethodLabel(order.getPaymentMethod()) + "\n\n"
                        + orderCreatedMessage(order)
                        + "\n\nTechMart"
        );
    }

    public void sendPaymentConfirmed(Order order) {
        send(
                order,
                "Thanh toán thành công - đơn hàng " + order.getId(),
                "Xin chào " + order.getCustomerFullName() + ",\n\n"
                        + "Thanh toán cho đơn hàng " + order.getId()
                        + " đã được xác nhận.\n"
                        + "Mã giao dịch: ****"
                        + order.getBankTransferLast4() + "\n"
                        + "Tổng tiền: " + formatMoney(order.getTotal())
                        + "\n\n"
                        + "Đơn hàng đã được tạo và đang được xử lý giao hàng."
                        + "\n\nTechMart"
        );
    }

    private void send(Order order, String subject, String body) {

        if (!enabled
                || order.getCustomerEmail() == null
                || order.getCustomerEmail().isBlank()) {
            return;
        }

        if (from == null || from.isBlank()) {
            logger.warn("Email is enabled but SES sender email is not configured");
            return;
        }

        try {
            Destination destination = Destination.builder()
                    .toAddresses(order.getCustomerEmail())
                    .build();

            Content subjectContent = Content.builder()
                    .data(subject)
                    .build();

            Content bodyContent = Content.builder()
                    .data(body)
                    .build();

            Body emailBody = Body.builder()
                    .text(bodyContent)
                    .build();

            Message message = Message.builder()
                    .subject(subjectContent)
                    .body(emailBody)
                    .build();

            SendEmailRequest request = SendEmailRequest.builder()
                    .fromEmailAddress(from)
                    .destination(destination)
                    .content(
                            EmailContent.builder()
                                    .simple(message)
                                    .build()
                    )
                    .build();

            sesV2Client.sendEmail(request);

            logger.info(
                    "Email sent successfully for order {}",
                    order.getId()
            );

        } catch (SesV2Exception exception) {
            logger.error(
                    "Could not send email for order {}",
                    order.getId(),
                    exception
            );
        } catch (RuntimeException exception) {
            logger.error(
                    "Unexpected error while sending email for order {}",
                    order.getId(),
                    exception
            );
        }
    }

    private String formatMoney(java.math.BigDecimal amount) {
        return NumberFormat
                .getCurrencyInstance(Locale.forLanguageTag("vi-VN"))
                .format(amount);
    }

    private String paymentMethodLabel(String paymentMethod) {
        return switch (paymentMethod) {
            case "BANK_TRANSFER" -> "Chuyển khoản ngân hàng";
            case "COD" -> "Thanh toán khi nhận hàng";
            default -> paymentMethod;
        };
    }

    private String orderCreatedMessage(Order order) {
        if ("COD".equals(order.getPaymentMethod())) {
            return "Đơn hàng đã được tạo và đang được xử lý giao hàng.";
        }

        return "Đơn hàng sẽ được cập nhật khi thanh toán được xác nhận.";
    }
}