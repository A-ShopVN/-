document.addEventListener('DOMContentLoaded', () => {
    const signUpBtn = document.getElementById('sign-up-btn');
    const signInBtn = document.getElementById('sign-in-btn');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const profileEmail = document.getElementById('user-email'); // Để hiển thị email người dùng trong profile

    signUpBtn.addEventListener('click', () => {
        document.querySelector('.container').classList.add('sign-up-mode');
    });

    signInBtn.addEventListener('click', () => {
        document.querySelector('.container').classList.remove('sign-up-mode');
    });

    signupBtn.addEventListener('click', () => {
        const email = document.getElementById('sign-up-email').value;
        const password = document.getElementById('sign-up-password').value;

        if (email && password) {
            if (!validateEmail(email)) {
                alert('Please enter a valid email address!');
                return;
            }

            if (!validatePassword(password)) {
                alert('Password must be at least 6 characters long and contain both letters and numbers!');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.find(user => user.email === email);
            if (userExists) {
                alert('Email already registered!');
            } else {
                users.push({ email, password });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Registration successful!');
                document.querySelector('.container').classList.remove('sign-up-mode');
            }
        } else {
            alert('Please fill all fields!');
        }
    });

    loginBtn.addEventListener('click', () => {
        const email = document.getElementById('sign-in-email').value;
        const password = document.getElementById('sign-in-password').value;

        if (!validateEmail(email)) {
            alert('Please enter a valid email address!');
            return;
        }

        if (!validatePassword(password)) {
            alert('Password must be at least 6 characters long and contain both letters and numbers!');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem('loggedInEmail', email); // Lưu email vào localStorage khi đăng nhập thành công
            alert('Login successful!');
            window.location.href = 'shop.html'; // Đổi đường dẫn này đến trang chủ của bạn
        } else {
            alert('Invalid email or password!');
        }
    });

    // Hiển thị email người dùng khi trang được tải
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    if (loggedInEmail && profileEmail) {
        profileEmail.textContent = loggedInEmail;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePassword(password) {
        const re = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
        return re.test(password);
    }
});
