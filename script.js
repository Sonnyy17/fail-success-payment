$(document).ready(function () {
    $('#feedbackButton').on('click', async function () {
        const messageContainer = $('#countUp'); // Vùng chứa thông báo

        // Lấy userId và orderCode từ URL
        const currentUrl = window.location.href;
        const userId = new URLSearchParams(window.location.search).get('userId');
        const orderCode = new URLSearchParams(window.location.search).get('orderCode');

        // Kiểm tra userId hợp lệ
        if (!userId) {
            messageContainer.append('<div class="text error">Invalid userId in URL.</div>');
            setTimeout(() => {
                window.location.href = 'https://forms.gle/H5Bj8Kwz9NLMst6V6';
            }, 1000);
            return;
        }

        // Hiển thị thông báo xử lý
        messageContainer.append('<div class="text processing">Processing your feedback...</div>');

        try {
            // Gửi yêu cầu POST tới API  
            //const response = await fetch(`https://localhost:7296/api/payment/confirm?userId=${userId}&orderCode=${orderCode}`, {
            const response = await fetch(`https://xungxinh.azurewebsites.net/api/payment/confirm?userId=${userId}&orderCode=${orderCode}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Xử lý phản hồi từ API
            if (response.ok) {
                const data = await response.json();
                $('.processing').remove();
                messageContainer.append('<div class="text success">Feedback submitted successfully!</div>');
            } else {
                const error = await response.json();
                $('.processing').remove();
                messageContainer.append(`<div class="text error">Error: ${error.message || 'Unable to submit feedback.'}</div>`);
            }
        } catch (err) {
            console.error('Error:', err);
            $('.processing').remove();
            messageContainer.append('<div class="text error">Something went wrong. Please try again later.</div>');
        } finally {
            // Chuyển hướng đến Google Form bất kể kết quả
            setTimeout(() => {
                window.location.href = 'https://forms.gle/H5Bj8Kwz9NLMst6V6'; // Link Google Form thật
            }, 1000);
        }
    });
});
