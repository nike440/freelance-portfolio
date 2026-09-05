/* =========================================================
   STUDYOS — FUNCTIONAL JAVASCRIPT
   Tasks • Timer • Schedule • Navigation • Progress
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================= */

    const navLinks = document.querySelectorAll(".nav-link");
    const pageSections = document.querySelectorAll(".page-section");

    const taskCount = document.getElementById("taskCount");
    const progressPercent = document.getElementById("progressPercent");
    const progressPagePercent =
        document.getElementById("progressPagePercent");
    const progressPageTasks =
        document.getElementById("progressPageTasks");

    const dashboardTaskList =
        document.getElementById("dashboardTaskList");
    const allTaskList =
        document.getElementById("allTaskList");

    const quickAddTask =
        document.getElementById("quickAddTask");
    const addTaskPage =
        document.getElementById("addTaskPage");

    const focusButton =
        document.getElementById("focusButton");
    const focusButtonSecondary =
        document.getElementById("focusButtonSecondary");
    const timerDisplay =
        document.getElementById("timerDisplay");


    /* =========================
       LOCAL STORAGE
    ========================= */

    const TASK_KEY = "studyOS_tasks";
    const SCHEDULE_KEY = "studyOS_schedule";
    const FOCUS_KEY = "studyOS_focusMinutes";

    const defaultTasks = [
        {
            text: "Practice Java OOP",
            completed: false
        },
        {
            text: "Study DBMS",
            completed: false
        },
        {
            text: "Complete Web Development",
            completed: false
        },
        {
            text: "Practice Python",
            completed: false
        }
    ];

    const defaultSchedule = [
        { completed: true },
        { completed: false },
        { completed: false },
        { completed: false }
    ];


    /* =========================
       LOAD TASKS
    ========================= */

    function loadTasks() {

        try {

            const saved =
                localStorage.getItem(TASK_KEY);

            if (!saved) {

                localStorage.setItem(
                    TASK_KEY,
                    JSON.stringify(defaultTasks)
                );

                return [...defaultTasks];
            }

            const parsed = JSON.parse(saved);

            if (!Array.isArray(parsed)) {
                return [...defaultTasks];
            }

            return parsed;

        } catch (error) {

            console.error(
                "Unable to load tasks:",
                error
            );

            return [...defaultTasks];
        }
    }


    function saveTasks(tasks) {

        localStorage.setItem(
            TASK_KEY,
            JSON.stringify(tasks)
        );
    }


    let tasks = loadTasks();


    /* =========================
       LOAD SCHEDULE
    ========================= */

    function loadSchedule() {

        try {

            const saved =
                localStorage.getItem(SCHEDULE_KEY);

            if (!saved) {

                localStorage.setItem(
                    SCHEDULE_KEY,
                    JSON.stringify(defaultSchedule)
                );

                return [...defaultSchedule];
            }

            const parsed = JSON.parse(saved);

            if (!Array.isArray(parsed)) {
                return [...defaultSchedule];
            }

            return parsed;

        } catch (error) {

            console.error(
                "Unable to load schedule:",
                error
            );

            return [...defaultSchedule];
        }
    }


    function saveSchedule(schedule) {

        localStorage.setItem(
            SCHEDULE_KEY,
            JSON.stringify(schedule)
        );
    }


    let schedule = loadSchedule();


    /* =========================
       UPDATE STATISTICS
    ========================= */

    function updateStatistics() {

        const total = tasks.length;

        const completed =
            tasks.filter(
                task => task.completed
            ).length;

        const remaining =
            total - completed;

        const percentage =
            total === 0
                ? 0
                : Math.round(
                    (completed / total) * 100
                );


        if (taskCount) {

            taskCount.textContent =
                remaining;
        }


        if (progressPercent) {

            progressPercent.textContent =
                `${percentage}%`;
        }


        if (progressPagePercent) {

            progressPagePercent.textContent =
                `${percentage}%`;
        }


        if (progressPageTasks) {

            progressPageTasks.textContent =
                total;
        }
    }


    /* =========================
       CREATE TASK ELEMENT
    ========================= */

    function createTaskElement(task, index) {

        const label =
            document.createElement("label");

        label.className = "task";


        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked =
            Boolean(task.completed);


        const check =
            document.createElement("span");

        check.className =
            "task-check";


        const text =
            document.createElement("span");

        text.className =
            "task-text";

        text.textContent =
            task.text;


        label.appendChild(checkbox);
        label.appendChild(check);
        label.appendChild(text);


        checkbox.addEventListener(
            "change",
            () => {

                tasks[index].completed =
                    checkbox.checked;

                saveTasks(tasks);

                renderTasks();

                updateStatistics();
            }
        );


        return label;
    }


    /* =========================
       RENDER TASKS
    ========================= */

    function renderTasks() {

        /* Dashboard */

        if (dashboardTaskList) {

            dashboardTaskList.innerHTML = "";

            tasks.forEach(
                (task, index) => {

                    const element =
                        createTaskElement(
                            task,
                            index
                        );

                    dashboardTaskList.appendChild(
                        element
                    );
                }
            );
        }


        /* Tasks Page */

        if (allTaskList) {

            allTaskList.innerHTML = "";


            if (tasks.length === 0) {

                const empty =
                    document.createElement("p");

                empty.textContent =
                    "No tasks yet. Add your first task.";

                empty.className =
                    "empty-task-message";

                allTaskList.appendChild(
                    empty
                );

            } else {

                tasks.forEach(
                    (task, index) => {

                        const element =
                            createTaskElement(
                                task,
                                index
                            );

                        allTaskList.appendChild(
                            element
                        );
                    }
                );
            }
        }
    }


    /* =========================
       ADD NEW TASK
    ========================= */

    function addNewTask() {

        const taskText =
            prompt("Enter your task:");


        if (taskText === null) {
            return;
        }


        const cleanedText =
            taskText.trim();


        if (!cleanedText) {

            alert(
                "Please enter a task."
            );

            return;
        }


        tasks.push({

            text: cleanedText,

            completed: false
        });


        saveTasks(tasks);

        renderTasks();

        updateStatistics();
    }


    if (quickAddTask) {

        quickAddTask.addEventListener(
            "click",
            addNewTask
        );
    }


    if (addTaskPage) {

        addTaskPage.addEventListener(
            "click",
            addNewTask
        );
    }


    /* =========================
       SCHEDULE
    ========================= */

    function setupSchedule() {

        const scheduleItems =
            document.querySelectorAll(
                ".schedule-item"
            );


        scheduleItems.forEach(
            (item, index) => {

                const button =
                    item.querySelector(
                        ".schedule-status"
                    );


                if (!button) {
                    return;
                }


                const isCompleted =
                    Boolean(
                        schedule[index]?.completed
                    );


                updateScheduleUI(
                    item,
                    button,
                    isCompleted
                );


                button.addEventListener(
                    "click",
                    () => {

                        if (!schedule[index]) {

                            schedule[index] = {
                                completed: false
                            };
                        }


                        schedule[index].completed =
                            !schedule[index].completed;


                        saveSchedule(schedule);


                        updateScheduleUI(
                            item,
                            button,
                            schedule[index].completed
                        );
                    }
                );
            }
        );
    }


    function updateScheduleUI(
        item,
        button,
        completed
    ) {

        if (completed) {

            item.classList.add(
                "completed"
            );

            button.classList.add(
                "completed-status"
            );

            button.textContent =
                "✓ Completed";

        } else {

            item.classList.remove(
                "completed"
            );

            button.classList.remove(
                "completed-status"
            );

            button.textContent =
                "Upcoming";
        }
    }


    /* =========================
       FOCUS TIMER
    ========================= */

    const DEFAULT_TIMER =
        25 * 60;


    let timerSeconds =
        DEFAULT_TIMER;

    let timerInterval =
        null;

    let timerRunning =
        false;


    function formatTime(seconds) {

        const minutes =
            Math.floor(
                seconds / 60
            );

        const remainingSeconds =
            seconds % 60;


        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(remainingSeconds).padStart(2, "0")
        );
    }


    function updateTimerDisplay() {

        if (!timerDisplay) {
            return;
        }

        timerDisplay.textContent =
            formatTime(timerSeconds);
    }


    function setFocusButtonState() {

        if (!focusButton) {
            return;
        }


        const icon =
            focusButton.querySelector("span");


        if (icon) {

            icon.textContent =
                timerRunning
                    ? "Ⅱ"
                    : "▶";
        }


        const textNodes =
            [...focusButton.childNodes]
                .filter(
                    node =>
                        node.nodeType ===
                        Node.TEXT_NODE
                );


        if (textNodes.length > 0) {

            textNodes[
                textNodes.length - 1
            ].textContent =
                timerRunning
                    ? " PAUSE"
                    : " START FOCUS";
        }
    }


    function startTimer() {

        if (timerRunning) {
            return;
        }


        if (timerSeconds <= 0) {

            timerSeconds =
                DEFAULT_TIMER;

            updateTimerDisplay();
        }


        timerRunning = true;

        setFocusButtonState();


        timerInterval =
            setInterval(
                () => {

                    timerSeconds--;

                    updateTimerDisplay();


                    if (timerSeconds <= 0) {

                        finishTimer();
                    }

                },
                1000
            );
    }


    function pauseTimer() {

        if (!timerRunning) {
            return;
        }


        clearInterval(
            timerInterval
        );


        timerInterval = null;

        timerRunning = false;

        setFocusButtonState();
    }


    function finishTimer() {

        clearInterval(
            timerInterval
        );


        timerInterval = null;

        timerRunning = false;

        timerSeconds = 0;


        updateTimerDisplay();

        setFocusButtonState();


        const currentFocus =
            Number(
                localStorage.getItem(
                    FOCUS_KEY
                )
            ) || 0;


        localStorage.setItem(
            FOCUS_KEY,
            String(currentFocus + 25)
        );


        alert(
            "Focus session complete. Good work."
        );
    }


    if (focusButton) {

        focusButton.addEventListener(
            "click",
            () => {

                if (timerRunning) {

                    pauseTimer();

                } else {

                    startTimer();
                }
            }
        );
    }


    if (focusButtonSecondary) {

        focusButtonSecondary.addEventListener(
            "click",
            () => {

                const dashboard =
                    document.getElementById(
                        "dashboard"
                    );


                if (dashboard) {

                    dashboard.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }


                if (timerRunning) {

                    pauseTimer();

                } else {

                    startTimer();
                }
            }
        );
    }


    updateTimerDisplay();

    setFocusButtonState();


    /* =========================
       SIDEBAR NAVIGATION
    ========================= */

    function showSection(sectionId) {

        pageSections.forEach(
            section => {

                section.classList.remove(
                    "active"
                );

                section.style.display =
                    "none";
            }
        );


        const target =
            document.getElementById(
                sectionId
            );


        if (target) {

            target.classList.add(
                "active"
            );

            target.style.display =
                "block";
        }


        navLinks.forEach(
            link => {

                link.classList.toggle(
                    "active",
                    link.dataset.section ===
                    sectionId
                );
            }
        );


        window.scrollTo({

            top: 0,

            behavior: "smooth"
        });
    }


    navLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    const section =
                        link.dataset.section;


                    if (section) {

                        showSection(
                            section
                        );
                    }
                }
            );
        }
    );


    /* =========================
       INITIALIZE
    ========================= */

    renderTasks();

    updateStatistics();

    setupSchedule();


    pageSections.forEach(
        section => {

            if (
                !section.classList.contains(
                    "active"
                )
            ) {

                section.style.display =
                    "none";

            } else {

                section.style.display =
                    "block";
            }
        }
    );

});