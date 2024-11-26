//'https://localhost:7296/api/payment/confirm'


$(document).ready(function () {
    $('#feedbackButton').on('click', async function () {
        const messageContainer = $('#countUp'); // Vùng chứa thông báo

        // Lấy userId từ URL
        const currentUrl = window.location.href; // URL hiện tại
        //const userId = currentUrl.split('/').pop(); // Lấy phần cuối cùng của URL làm userId
        const userId = urlParams.get('userId');

        // Kiểm tra userId hợp lệ
        if (!userId || isNaN(userId)) {
            messageContainer.append('<div class="text error">Invalid userId in URL.</div>');
            return;
        }

        // Hiển thị thông báo xử lý
        messageContainer.append('<div class="text processing">Processing your feedback...</div>');

        try {
            // Gửi yêu cầu POST tới API
            const response = await fetch('https://localhost:7296/api/payment/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID: userId }), // Gửi userId lấy từ URL
            });

            // Xử lý phản hồi từ API
            if (response.ok) {
                const data = await response.json();
                $('.processing').remove(); // Xóa thông báo xử lý
                messageContainer.append('<div class="text success">Feedback submitted successfully!</div>');

                // Chuyển hướng sau 2 giây
                setTimeout(() => {
                    window.location.href = 'https://forms.gle/example-form-link'; // Link thật
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


