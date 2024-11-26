$(document).ready(function () {
    $('#feedbackButton').on('click', async function () {
        const messageContainer = $('#countUp'); // Vùng chứa thông báo

        // Lấy userId từ URL
        const currentUrl = window.location.href;
        const userId = new URLSearchParams(window.location.search).get('userId'); // Lấy userId từ query parameter

        // Kiểm tra userId hợp lệ
        if (!userId) {
            messageContainer.append('<div class="text error">Invalid userId in URL.</div>');
            return;
        }

        // Hiển thị thông báo xử lý
        messageContainer.append('<div class="text processing">Processing your feedback...</div>');

        try {
            // Gửi yêu cầu POST tới API (truyền userId dưới dạng query parameter)
            const response = await fetch(`https://localhost:7296/api/payment/confirm?userId=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Xử lý phản hồi từ API
            if (response.ok) {
                const data = await response.json();
                $('.processing').remove(); // Xóa thông báo xử lý
                messageContainer.append('<div class="text success">Feedback submitted successfully!</div>');

                // Chuyển hướng sau 2 giây
                setTimeout(() => {
                    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfjYf5UJeZi2QLt8mJr8AdbR3X03p-yizBVl2WHqx-Oz79vWw/viewform?usp=sf_link'; // Link thật
                }, 2000);
            } else {
                const error = await response.json();
                $('.processing').remove();
                messageContainer.append(`<div class="text error">Error: ${error.message || 'Unable to submit feedback.'}</div>`);
            }
        } catch (err) {
            console.error('Error:', err);
            $('.processing').remove();
            messageContainer.append('<div class="text error">Something went wrong. Please try again later.</div>');
        }
    });
});
