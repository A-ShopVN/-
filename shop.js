const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');

sideLinks.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', () => {
        sideLinks.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});

const menuBar = document.querySelector('.content nav .bx.bx-menu');
const sideBar = document.querySelector('.sidebar');

menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

const searchBtn = document.querySelector('.content nav form .form-input button');
const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
const searchForm = document.querySelector('.content nav form');

searchBtn.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault;
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchBtnIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchBtnIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        sideBar.classList.add('close');
    } else {
        sideBar.classList.remove('close');
    }
    if (window.innerWidth > 576) {
        searchBtnIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

const toggler = document.getElementById('theme-toggle');

toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});
document.querySelectorAll('.tab-item').forEach(tab => {
    tab.addEventListener('click', () => {
      // Xóa lớp 'active' khỏi tất cả các thẻ li
      document.querySelectorAll('.tab-item').forEach(item => {
        item.classList.remove('active');
      });
  
      // Thêm lớp 'active' vào thẻ li được chọn
      tab.classList.add('active');
  
      // Lấy ID của tab tương ứng
      const tabId = tab.getAttribute('data-tab');
  
      // Ẩn tất cả nội dung tab
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
  
      // Hiển thị nội dung tab được chọn
      document.getElementById(tabId).classList.add('active');
    });
  });
//   
document.getElementById('logout').addEventListener('click', function() {
    // Clear any session data or authentication state if needed
    // Redirect to login page
    // window.location.href = 'login.html';
    document.body.innerHTML = '<h1>Logging out...</h1>';

     // Delay redirect by 3 seconds
     setTimeout(function() {
    window.location.href = 'login.html';
     }, 3000);
});


// ================dashboard==========>>
document.addEventListener("DOMContentLoaded", function() {
    // Ngày bắt đầu (có thể thay đổi ngày này theo yêu cầu)
    const startDate = new Date("2024-08-10"); // Ngày bắt đầu gốc của bạn

    // Hàm để tính số ngày đã trôi qua từ ngày bắt đầu
    function daysSinceStart() {
        const today = new Date();
        const timeDifference = today - startDate;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Số ngày đã trôi qua
    }

    // Hàm để cập nhật số liệu trong phần Insights
    function updateInsights() {
        const days = daysSinceStart();

        // Các giá trị cơ bản
        const initialValues = {
            paidOrders: 1074,
            siteVisit: 3944,
            searches: 14721,
            totalSales: 6742
        };

        // Cập nhật các giá trị theo số ngày đã trôi qua
        document.getElementById("paid-orders").textContent = initialValues.paidOrders + days;
        document.getElementById("site-visit").textContent = initialValues.siteVisit + days;
        document.getElementById("searches").textContent = initialValues.searches + days;
        document.getElementById("total-sales").textContent = `$${initialValues.totalSales + days * 10}`; // Ví dụ tăng 10 đô la mỗi ngày
    }

    // Cập nhật ngay khi tải trang
    updateInsights();

    // Cập nhật mỗi ngày
    setInterval(updateInsights, 24 * 60 * 60 * 1000); // 24 giờ tính bằng mili giây
});



// ===================recent orders=================






// ================================battery===================//
/*=============== BATTERY ===============*/
initBattery()

function initBattery(){
    const batteryLiquid = document.querySelector('.battery__liquid'),
          batteryStatus = document.querySelector('.battery__status'),
          batteryPercentage = document.querySelector('.battery__percentage')
    
    navigator.getBattery().then((batt) =>{
        updateBattery = () =>{
            /* 1. We update the number level of the battery */
            let level = Math.floor(batt.level * 100)
            batteryPercentage.innerHTML = level+ '%'

            /* 2. We update the background level of the battery */
            batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`

            /* 3. We validate full battery, low battery and if it is charging or not */
            if(level == 100){ /* We validate if the battery is full */
                batteryStatus.innerHTML = `Full battery <i class="ri-battery-2-fill green-color"></i>`
                batteryLiquid.style.height = '103%' /* To hide the ellipse */
            }
            else if(level <= 20 &! batt.charging){ /* We validate if the battery is low */
                batteryStatus.innerHTML = `Low battery <i class="ri-plug-line animated-red"></i>`
            }
            else if(batt.charging){ /* We validate if the battery is charging */
                batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`
            }
            else{ /* If it's not loading, don't show anything. */
                batteryStatus.innerHTML = ''
            }
            
            /* 4. We change the colors of the battery and remove the other colors */
            if(level <=20){
                batteryLiquid.classList.add('gradient-color-red')
                batteryLiquid.classList.remove('gradient-color-orange','gradient-color-yellow','gradient-color-green')
            }
            else if(level <= 40){
                batteryLiquid.classList.add('gradient-color-orange')
                batteryLiquid.classList.remove('gradient-color-red','gradient-color-yellow','gradient-color-green')
            }
            else if(level <= 80){
                batteryLiquid.classList.add('gradient-color-yellow')
                batteryLiquid.classList.remove('gradient-color-red','gradient-color-orange','gradient-color-green')
            }
            else{
                batteryLiquid.classList.add('gradient-color-green')
                batteryLiquid.classList.remove('gradient-color-red','gradient-color-orange','gradient-color-yellow')
            }
        }
        updateBattery()

        /* 5. Battery status events */
        batt.addEventListener('chargingchange', () => {updateBattery()})
        batt.addEventListener('levelchange', () => {updateBattery()})
    })
}
// Khi người dùng chọn một tab
document.querySelectorAll('.tab-item').forEach(tab => {
    tab.addEventListener('click', () => {
        // Lưu ID của tab đang "active" vào localStorage
        localStorage.setItem('activeTab', tab.getAttribute('data-tab'));
    });
});

// Khi trang được tải lại
window.addEventListener('DOMContentLoaded', () => {
    const activeTabId = localStorage.getItem('activeTab');
    if (activeTabId) {
        // Tìm và kích hoạt tab tương ứng
        document.querySelector(`.tab-item[data-tab="${activeTabId}"]`).classList.add('active');
        document.getElementById(activeTabId).classList.add('active');
    }
});
// Khi người dùng chuyển đổi theme
toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
});

// Khi trang được tải lại
window.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark');
        toggler.checked = true;
    } else {
        document.body.classList.remove('dark');
        toggler.checked = false;
    }
});
// =============================bell=====================================/
// Hiển thị hoặc ẩn danh sách thông báo khi nhấp vào chuông
document.querySelector('.notif').addEventListener('click', function() {
    const dropdown = document.querySelector('.notification-dropdown');
    const list = dropdown.querySelector('.notification-list');
    const noNotifications = dropdown.querySelector('.no-notifications');
    
    if (list.children.length > 0) {
        list.style.display = 'block';
        noNotifications.style.display = 'none';
    } else {
        list.style.display = 'none';
        noNotifications.style.display = 'block';
    }
    
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// Thêm thông báo vào danh sách
function addNotification(message) {
    const list = document.querySelector('.notification-list');
    const noNotifications = document.querySelector('.no-notifications');
    
    noNotifications.style.display = 'none';
    
    const newNotification = document.createElement('li');
    newNotification.textContent = message;
    list.appendChild(newNotification);
}

// Ví dụ gọi hàm để thêm thông báo
// addNotification('Bạn có thông báo mới!');
// =======================================profile=====================================/
// document.addEventListener('DOMContentLoaded', () => {
//     const profileEmail = document.getElementById('user-email');
//     const loggedInEmail = localStorage.getItem('loggedInEmail');

//     if (loggedInEmail) {
//         profileEmail.textContent = loggedInEmail; // Hiển thị email của người dùng
//     }
// });



// ==========================================earns=======================================/

let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

nextButton.onclick = function(){
    showSlider('next');
}
prevButton.onclick = function(){
    showSlider('prev');
}
let unAcceppClick;
const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');
    if(type === 'next'){
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    }else{
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }
    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(()=>{
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000)
}
seeMoreButtons.forEach((button) => {
    button.onclick = function(){
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
    }
});
backButton.onclick = function(){
    carousel.classList.remove('showDetail');
}




// ===========================================hot product========================================/
document.addEventListener("DOMContentLoaded", function() {
    fetchHotProducts();
});

function fetchHotProducts() {
    // Đây là nơi bạn có thể fetch dữ liệu từ server hoặc API
    // Thay thế dữ liệu sản phẩm ở đây bằng cách fetch từ server
}


