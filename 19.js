// var currentYear = 2024;
// var currentMonth = 12;
var today=new Date();
var currentYear = today.getFullYear();
// console.log(currentYear);
var currentMonth = today.getMonth()+1;
var PREV_TYPE = "PREV";
var CURRENT_TYPE = "CURRENT";
var NEXT_TYPE = "NEXT";

// function showMonth(){
//     var year_month=year+"年"+month+"月";
//     document.getElementById("dqrq").innerHTML=year_month;
// }

function getDateOfMoth(year, month) {//计算一个月有多少天
    var dateInstance = new Date(year,month,0);
    var dateCount = dateInstance.getDate();
    return dateCount
}

function getDayOfMothFiirstDate(year, month) {
    var dateInstance = new Date(year,month - 1,1);
    var day = dateInstance.getDay();//第一天星期几
    return day;
}
//更新年月
function updateYearAndMonth(newYear,newMonth) {
    var yearElement = document.querySelector(".calendar-toolbar_title");
    var calendarRoot = document.querySelector(".calendar");
    yearElement.innerText = newYear + '年' + newMonth + '月';
    calendarRoot.style.setProperty("--month",`"${newMonth}`);
    currentYear = newYear;
    currentMonth = newMonth;
}

//初始化事件
function bindEvent() {
    var calendarRoot = document.querySelector(".calendar");
    calendarRoot.addEventListener("click",function (e) {
        var dateInstance = new Date(currentYear,currentMonth - 1);
        var className = e.target.className;
        if(className === "calendar-toolbar_prev") {
            dateInstance.setMonth(dateInstance.getMonth() - 1);
            var newYear = dateInstance.getFullYear();
            var newMonth = dateInstance.getMonth() + 1;
            updateYearAndMonth(newYear,newMonth);
            createCalendar(newYear,newMonth);
        }
        if (className === "calendar-toolbar_next") {
            dateInstance.setMonth(dateInstance.getMonth() + 1);
            var newYear = dateInstance.getFullYear();
            var newMonth = dateInstance.getMonth() + 1;
            updateYearAndMonth(newYear,newMonth);
            createCalendar(newYear,newMonth);
        }
        if (className.indexOf("calendar-date_current") > -1) {
            console.log(e.target.customCalendarInfo);
        }
    });
}
bindEvent();

//创建日期单元格文档片段的方法
function createDateCellFragment(start,end,type) {
    var fragment = document.createDocumentFragment();
    for (var i = start; i <= end; i++) {
        var calendarDateElement = document.createElement("div");
        calendarDateElement.classList.add("calendar-date_base");
        calendarDateElement.innerText = i;
        switch (type) {
            case PREV_TYPE:
                calendarDateElement.classList.add("calendar-date_disable");
                break;
            case CURRENT_TYPE:
                calendarDateElement.classList.add("calendar-date_current");
                calendarDateElement.customCalendarInfo = {
                    year:currentYear,
                    month:currentMonth,
                    date:i,
                };
                break;
            case NEXT_TYPE:
                calendarDateElement.classList.add("calendar-date_disable");
                break;
            default:
                break;
        }
        fragment.appendChild(calendarDateElement);
    }
    return fragment;
}
function createCalendar(year,month) {
    var WEEK_DATE_COUNT = 7;
    var mainFrangment = document.createDocumentFragment();
    var mainBody = document.querySelector(".calendar-main_body");
    var currentMonthDateCount = getDateOfMoth(year,month);//当前月份天数
    var prevMonthDateCount = getDateOfMoth(year,month - 1);//上月天数
    var dayOfCurrentMonthFirstDate = getDayOfMothFiirstDate(year,month);//当前月
    var prevMonthDatepadding = dayOfCurrentMonthFirstDate;
    var nextMonthDatePadding = 
        WEEK_DATE_COUNT - 
        ((prevMonthDatepadding + currentMonthDateCount) % WEEK_DATE_COUNT);
    if (nextMonthDatePadding === 7) nextMonthDatePadding = 0;
    //创建1号前 需要补的日期单元格
    var prevMonthDatepaddingFragment = createDateCellFragment(
        prevMonthDateCount - prevMonthDatepadding + 1,
        prevMonthDateCount,
        PREV_TYPE
    );
    var currentMonthDateFragment = createDateCellFragment(
        1,
        currentMonthDateCount,
        CURRENT_TYPE
    );
    var nextMonthDatePaddingFragment = createDateCellFragment(
        1,
        nextMonthDatePadding,
        NEXT_TYPE
    );
    mainFrangment.appendChild(prevMonthDatepaddingFragment);
    mainFrangment.appendChild(currentMonthDateFragment);
    mainFrangment.appendChild(nextMonthDatePaddingFragment);
    mainBody.innerHTML = "";
    mainBody.appendChild(mainFrangment);
}
createCalendar(2024, 12);