let user = {
    name: '',
    goal: '',
    difficulty: '',
    rank: 'E',
    day: 0,
    completedTasks: 0,
    weeklyProgress: [],
    currentTasks: [],
    penaltyMultiplier: 1,
    streak: 0,
    calories: []
};

const workoutPlans = {
    'strength': {
        'beginner': [
            [{ name: 'Push-ups', base: 5, unit: 'reps' }, { name: 'Squats', base: 8, unit: 'reps' }, { name: 'Plank', base: 15, unit: 'sec' }, { name: 'Arm Curls', base: 10, unit: 'reps' }],
            [{ name: 'Wall Push-ups', base: 8, unit: 'reps' }, { name: 'Lunges', base: 6, unit: 'reps/side' }, { name: 'Side Plank', base: 10, unit: 'sec' }, { name: 'Calf Raises', base: 12, unit: 'reps' }]
        ],
        'intermediate': [
            [{ name: 'Push-ups', base: 10, unit: 'reps' }, { name: 'Squats', base: 15, unit: 'reps' }, { name: 'Plank', base: 20, unit: 'sec' }, { name: 'Dumbbell Rows', base: 8, unit: 'reps' }],
            [{ name: 'Pull-ups', base: 5, unit: 'reps' }, { name: 'Lunges', base: 10, unit: 'reps/side' }, { name: 'Deadlifts', base: 8, unit: 'reps' }, { name: 'Shoulder Press', base: 6, unit: 'reps' }]
        ],
        'advanced': [
            [{ name: 'Clap Push-ups', base: 15, unit: 'reps' }, { name: 'Jump Squats', base: 20, unit: 'reps' }, { name: 'Plank with Leg Lift', base: 30, unit: 'sec' }, { name: 'Barbell Bench', base: 10, unit: 'reps' }],
            [{ name: 'Pull-ups', base: 10, unit: 'reps' }, { name: 'Weighted Lunges', base: 15, unit: 'reps/side' }, { name: 'Deadlifts', base: 12, unit: 'reps' }, { name: 'Muscle-ups', base: 5, unit: 'reps' }]
        ]
    },
    'endurance': {
        'beginner': [
            [{ name: 'Jogging', base: 1, unit: 'km' }, { name: 'Jumping Jacks', base: 20, unit: 'reps' }, { name: 'High Knees', base: 15, unit: 'reps' }, { name: 'Step-ups', base: 12, unit: 'reps' }],
            [{ name: 'Walking', base: 20, unit: 'min' }, { name: 'Mountain Climbers', base: 15, unit: 'reps' }, { name: 'Burpees', base: 5, unit: 'reps' }, { name: 'Skater Jumps', base: 10, unit: 'reps' }]
        ],
        'intermediate': [
            [{ name: 'Running', base: 3, unit: 'km' }, { name: 'Jumping Jacks', base: 30, unit: 'reps' }, { name: 'Burpees', base: 10, unit: 'reps' }, { name: 'Box Jumps', base: 15, unit: 'reps' }],
            [{ name: 'Cycling', base: 10, unit: 'min' }, { name: 'High Knees', base: 20, unit: 'reps' }, { name: 'Mountain Climbers', base: 25, unit: 'reps' }, { name: 'Tuck Jumps', base: 8, unit: 'reps' }]
        ],
        'advanced': [
            [{ name: 'Running', base: 5, unit: 'km' }, { name: 'Jumping Jacks', base: 50, unit: 'reps' }, { name: 'Burpees', base: 15, unit: 'reps' }, { name: 'Sprint Intervals', base: 5, unit: 'min' }],
            [{ name: 'Cycling', base: 20, unit: 'min' }, { name: 'High Knees', base: 30, unit: 'reps' }, { name: 'Mountain Climbers', base: 40, unit: 'reps' }, { name: 'Double Unders', base: 20, unit: 'reps' }]
        ]
    },
    'weight-loss': {
        'beginner': [
            [{ name: 'Brisk Walking', base: 10, unit: 'min' }, { name: 'Jump Rope', base: 30, unit: 'reps' }, { name: 'Plank', base: 15, unit: 'sec' }, { name: 'Side Bends', base: 10, unit: 'reps/side' }],
            [{ name: 'Jogging', base: 8, unit: 'min' }, { name: 'Side Lunges', base: 8, unit: 'reps/side' }, { name: 'Bicycle Crunches', base: 10, unit: 'reps' }, { name: 'Knee Tucks', base: 12, unit: 'reps' }]
        ],
        'intermediate': [
            [{ name: 'Jogging', base: 15, unit: 'min' }, { name: 'Jump Rope', base: 50, unit: 'reps' }, { name: 'Plank', base: 30, unit: 'sec' }, { name: 'Russian Twists', base: 15, unit: 'reps' }],
            [{ name: 'Sprint Intervals', base: 5, unit: 'min' }, { name: 'Side Lunges', base: 12, unit: 'reps/side' }, { name: 'Bicycle Crunches', base: 20, unit: 'reps' }, { name: 'Flutter Kicks', base: 20, unit: 'reps' }]
        ],
        'advanced': [
            [{ name: 'Running', base: 20, unit: 'min' }, { name: 'Jump Rope', base: 100, unit: 'reps' }, { name: 'Plank', base: 45, unit: 'sec' }, { name: 'Leg Raises', base: 15, unit: 'reps' }],
            [{ name: 'Sprint Intervals', base: 10, unit: 'min' }, { name: 'Side Lunges', base: 15, unit: 'reps/side' }, { name: 'Bicycle Crunches', base: 30, unit: 'reps' }, { name: 'Plank Jacks', base: 20, unit: 'reps' }]
        ]
    },
    'flexibility': {
        'beginner': [
            [{ name: 'Gentle Yoga', base: 5, unit: 'min' }, { name: 'Lunges', base: 5, unit: 'reps/side' }, { name: 'Cat-Cow', base: 10, unit: 'reps' }, { name: 'Neck Rolls', base: 8, unit: 'reps' }],
            [{ name: 'Stretching', base: 10, unit: 'min' }, { name: 'Butterfly Stretch', base: 20, unit: 'sec' }, { name: 'Seated Forward Bend', base: 15, unit: 'sec' }, { name: 'Hip Openers', base: 10, unit: 'sec/side' }]
        ],
        'intermediate': [
            [{ name: 'Yoga Flow', base: 10, unit: 'min' }, { name: 'Lunges', base: 8, unit: 'reps/side' }, { name: 'Cat-Cow', base: 15, unit: 'reps' }, { name: 'Pigeon Pose', base: 20, unit: 'sec/side' }],
            [{ name: 'Stretching', base: 15, unit: 'min' }, { name: 'Butterfly Stretch', base: 30, unit: 'sec' }, { name: 'Downward Dog', base: 20, unit: 'sec' }, { name: 'Cobra Stretch', base: 15, unit: 'sec' }]
        ],
        'advanced': [
            [{ name: 'Vinyasa Yoga', base: 15, unit: 'min' }, { name: 'Lunges', base: 12, unit: 'reps/side' }, { name: 'Cat-Cow', base: 20, unit: 'reps' }, { name: 'Thread the Needle', base: 20, unit: 'sec/side' }],
            [{ name: 'Stretching', base: 20, unit: 'min' }, { name: 'Butterfly Stretch', base: 45, unit: 'sec' }, { name: 'Downward Dog', base: 30, unit: 'sec' }, { name: 'King Pigeon', base: 25, unit: 'sec/side' }]
        ]
    },
    'power': {
        'beginner': [
            [{ name: 'Squats', base: 8, unit: 'reps' }, { name: 'Bench Press', base: 5, unit: 'reps' }, { name: 'Box Jumps', base: 5, unit: 'reps' }, { name: 'Kettlebell Swings', base: 10, unit: 'reps' }],
            [{ name: 'Push-ups', base: 8, unit: 'reps' }, { name: 'Lunges', base: 6, unit: 'reps/side' }, { name: 'Deadlifts', base: 6, unit: 'reps' }, { name: 'Overhead Press', base: 5, unit: 'reps' }]
        ],
        'intermediate': [
            [{ name: 'Deadlifts', base: 6, unit: 'reps' }, { name: 'Bench Press', base: 8, unit: 'reps' }, { name: 'Box Jumps', base: 10, unit: 'reps' }, { name: 'Snatches', base: 5, unit: 'reps' }],
            [{ name: 'Kettlebell Swings', base: 15, unit: 'reps' }, { name: 'Overhead Press', base: 6, unit: 'reps' }, { name: 'Power Cleans', base: 5, unit: 'reps' }, { name: 'Thrusters', base: 8, unit: 'reps' }]
        ],
        'advanced': [
            [{ name: 'Deadlifts', base: 10, unit: 'reps' }, { name: 'Bench Press', base: 12, unit: 'reps' }, { name: 'Box Jumps', base: 15, unit: 'reps' }, { name: 'Clean and Jerk', base: 6, unit: 'reps' }],
            [{ name: 'Kettlebell Swings', base: 20, unit: 'reps' }, { name: 'Overhead Press', base: 10, unit: 'reps' }, { name: 'Power Cleans', base: 8, unit: 'reps' }, { name: 'Hang Snatches', base: 5, unit: 'reps' }]
        ]
    },
    'mobility': {
        'beginner': [
            [{ name: 'Dynamic Stretching', base: 5, unit: 'min' }, { name: 'Hip Circles', base: 8, unit: 'reps/side' }, { name: 'Arm Swings', base: 10, unit: 'reps' }, { name: 'Torso Twists', base: 10, unit: 'reps' }],
            [{ name: 'Cat-Cow', base: 10, unit: 'reps' }, { name: 'Thoracic Rotations', base: 6, unit: 'reps/side' }, { name: 'Leg Swings', base: 8, unit: 'reps/side' }, { name: 'Ankle Rolls', base: 10, unit: 'reps/side' }]
        ],
        'intermediate': [
            [{ name: 'Dynamic Stretching', base: 10, unit: 'min' }, { name: 'Hip Circles', base: 12, unit: 'reps/side' }, { name: 'Arm Swings', base: 15, unit: 'reps' }, { name: 'Lizard Pose', base: 20, unit: 'sec/side' }],
            [{ name: 'Foam Rolling', base: 15, unit: 'min' }, { name: 'Thoracic Rotations', base: 10, unit: 'reps/side' }, { name: 'Leg Swings', base: 12, unit: 'reps/side' }, { name: 'Wrist Stretches', base: 15, unit: 'sec/side' }]
        ],
        'advanced': [
            [{ name: 'Dynamic Stretching', base: 15, unit: 'min' }, { name: 'Hip Circles', base: 15, unit: 'reps/side' }, { name: 'Arm Swings', base: 20, unit: 'reps' }, { name: 'Cossack Squats', base: 10, unit: 'reps/side' }],
            [{ name: 'Foam Rolling', base: 20, unit: 'min' }, { name: 'Thoracic Rotations', base: 15, unit: 'reps/side' }, { name: 'Leg Swings', base: 15, unit: 'reps/side' }, { name: 'Scorpion Stretch', base: 20, unit: 'sec/side' }]
        ]
    }
};

const ranks = ['E', 'D', 'C', 'B', 'A', 'S'];
let progressChart, profileChart;

function proceedToGoals() {
    user.name = document.getElementById('userName').value.trim();
    if (!user.name) return alert('Please enter your name');
    document.getElementById('nameEntry').classList.add('hidden');
    document.getElementById('goalSelection').classList.remove('hidden', 'slide-in');
}

function selectGoal(goal) {
    user.goal = goal;
    document.getElementById('goalSelection').classList.add('hidden');
    document.getElementById('difficultySelection').classList.remove('hidden', 'slide-in');
}

function selectDifficulty(difficulty) {
    user.difficulty = difficulty;
    document.getElementById('difficultySelection').classList.add('hidden');
    document.getElementById('main').classList.remove('hidden', 'slide-in');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('dashName').textContent = user.name;
    document.getElementById('rank').textContent = user.rank;
    loadProgress();
    renderTasks();
    updateStreak();
}

function renderTasks() {
    const tasksDiv = document.getElementById('dailyTasks');
    tasksDiv.innerHTML = '';
    const daySet = user.day % 2;
    const baseMultiplier = Math.floor(user.day / 2) + 1;
    const multiplier = baseMultiplier * user.penaltyMultiplier;
    user.currentTasks = workoutPlans[user.goal][user.difficulty][daySet].map(task => ({
        ...task,
        reps: Math.round(task.base * multiplier),
        completed: false
    }));

    user.currentTasks.forEach((task, idx) => {
        const div = document.createElement('div');
        div.className = 'bg-white p-3 sm:p-4 rounded-xl shadow-md flex items-center justify-between slide-in';
        div.innerHTML = `
            <label class="flex items-center space-x-2 sm:space-x-3">
                <input type="checkbox" onchange="toggleTask(${idx})" class="w-4 sm:w-5 h-4 sm:h-5">
                <span class="text-sm sm:text-lg">${task.name}</span>
            </label>
            <span class="text-sm sm:text-lg text-teal-600">${task.reps} ${task.unit}</span>
        `;
        tasksDiv.appendChild(div);
    });
}

function toggleTask(index) {
    user.currentTasks[index].completed = !user.currentTasks[index].completed;
}

function completeDay() {
    if (!user.currentTasks.every(task => task.completed)) return alert('Complete all tasks first!');
    user.day++;
    user.completedTasks += user.currentTasks.length;
    user.weeklyProgress.push(user.completedTasks);
    user.penaltyMultiplier = 1;
    user.streak++;
    if (user.completedTasks % 10 === 0) {
        const rankIdx = ranks.indexOf(user.rank);
        if (rankIdx < ranks.length - 1) {
            user.rank = ranks[rankIdx + 1];
            const rankEl = document.getElementById('rank');
            rankEl.textContent = user.rank;
            rankEl.classList.add('rank-pulse');
            setTimeout(() => rankEl.classList.remove('rank-pulse'), 600);
        }
    }
    renderTasks();
    updateStreak();
    saveReport();
}

function skipDay() {
    if (user.currentTasks.every(task => !task.completed)) {
        user.penaltyMultiplier = Math.min(user.penaltyMultiplier + 0.2, 2);
        alert('No tasks completed! Tomorrow’s workout will be tougher as a penalty.');
        user.streak = 0;
    }
    user.day++;
    renderTasks();
    updateStreak();
}

function updateStreak() {
    document.getElementById('streak').textContent = `Streak: ${user.streak} ${user.streak === 1 ? 'Day' : 'Days'}`;
}

function showDashboard() {
    hideAllSections();
    document.getElementById('dashboard').classList.remove('hidden', 'slide-in');
}

function showProfile() {
    hideAllSections();
    document.getElementById('profile').classList.remove('hidden', 'slide-in');
    const progress = Math.min((user.completedTasks / 50) * 100, 100);
    document.getElementById('profileInfo').innerHTML = `
        <div>Name: <span class="text-teal-600">${user.name}</span></div>
        <div>Goal: <span class="text-teal-600">${user.goal.charAt(0).toUpperCase() + user.goal.slice(1)}</span></div>
        <div>Difficulty: <span class="text-teal-600">${user.difficulty.charAt(0).toUpperCase() + user.difficulty.slice(1)}</span></div>
        <div>Rank: <span class="text-amber-600 font-bold">${user.rank}</span></div>
        <div>Tasks Completed: <span class="text-teal-600">${user.completedTasks}</span></div>
        <div>Streak: <span class="text-teal-600">${user.streak} ${user.streak === 1 ? 'Day' : 'Days'}</span></div>
        <div class="space-y-2">
            <span>Progress:</span>
            <div class="bg-stone-200 h-3 sm:h-4 rounded-lg overflow-hidden">
                <div class="bg-teal-600 h-3 sm:h-4 rounded-lg progress-grow" style="--progress: ${progress}%"></div>
            </div>
        </div>
    `;
    renderProfileChart();
}

function showProgress() {
    if (user.day < 7) return alert('Complete a week to see your progress!');
    hideAllSections();
    document.getElementById('progressReport').classList.remove('hidden', 'slide-in');
    const progress = Math.min((user.completedTasks / 50) * 100, 100);
    document.getElementById('reportStats').innerHTML = `
        <div>Tasks Completed: <span class="text-teal-600">${user.completedTasks}</span></div>
        <div>Rank: <span class="text-amber-600 font-bold">${user.rank}</span></div>
        <div>Streak: <span class="text-teal-600">${user.streak} ${user.streak === 1 ? 'Day' : 'Days'}</span></div>
        <div class="space-y-2">
            <span>Weekly Progress:</span>
            <div class="bg-stone-200 h-3 sm:h-4 rounded-lg overflow-hidden">
                <div class="bg-teal-600 h-3 sm:h-4 rounded-lg progress-grow" style="--progress: ${progress}%"></div>
            </div>
        </div>
    `;
    renderProgressChart();
}

function showNutrition() {
    hideAllSections();
    document.getElementById('nutrition').classList.remove('hidden', 'slide-in');
    renderNutritionLog();
}

function hideAllSections() {
    document.querySelectorAll('#main > div').forEach(section => section.classList.add('hidden'));
}

function renderProfileChart() {
    const ctx = document.getElementById('profileChart').getContext('2d');
    if (profileChart) profileChart.destroy();
    profileChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: user.day }, (_, i) => `Day ${i + 1}`),
            datasets: [{
                label: 'Tasks Completed',
                data: user.weeklyProgress,
                borderColor: '#14b8a6',
                backgroundColor: 'rgba(20, 184, 166, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, grid: { color: '#d4d4d3' } }, x: { grid: { color: '#d4d4d3' } } },
            plugins: { legend: { labels: { color: '#44403c', font: { size: 12 } } } }
        }
    });
}

function renderProgressChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    if (progressChart) progressChart.destroy();
    progressChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({ length: user.day }, (_, i) => `Day ${i + 1}`),
            datasets: [{
                label: 'Tasks Completed',
                data: user.weeklyProgress,
                backgroundColor: '#14b8a6',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, grid: { color: '#d4d4d3' } }, x: { grid: { color: '#d4d4d3' } } },
            plugins: { legend: { labels: { color: '#44403c', font: { size: 12 } } } }
        }
    });
}

function saveReport() {
    localStorage.setItem('peakPulseData', JSON.stringify(user));
    alert('Progress saved!');
}

function loadProgress() {
    const savedData = localStorage.getItem('peakPulseData');
    if (savedData) {
        user = JSON.parse(savedData);
        document.getElementById('dashName').textContent = user.name;
        document.getElementById('rank').textContent = user.rank;
        renderTasks();
        updateStreak();
    }
}

function logNutrition() {
    const calories = parseInt(document.getElementById('calories').value);
    if (!calories || calories <= 0) return alert('Enter a valid calorie amount');
    user.calories.push({ date: new Date().toLocaleDateString(), amount: calories });
    document.getElementById('calories').value = '';
    renderNutritionLog();
    saveReport();
}

function renderNutritionLog() {
    const logDiv = document.getElementById('nutritionLog');
    logDiv.innerHTML = user.calories.length ? user.calories.map(entry => `<p>${entry.date}: ${entry.amount} kcal</p>`).join('') : '<p>No entries yet.</p>';
}

function shareProgress() {
    const text = `${user.name}’s PeakPulse Progress: Rank ${user.rank}, Streak ${user.streak} days, ${user.completedTasks} tasks completed! #PeakPulse`;
    if (navigator.share) {
        navigator.share({ title: 'My PeakPulse Progress', text }).catch(() => alert('Sharing failed'));
    } else {
        navigator.clipboard.writeText(text).then(() => alert('Progress copied to clipboard!'));
    }
}

function syncWearable() {
    const steps = Math.floor(Math.random() * 10000) + 5000;
    const heartRate = Math.floor(Math.random() * 40) + 60;
    document.getElementById('wearableData').textContent = `Steps: ${steps}, Avg. Heart Rate: ${heartRate} bpm`;
    alert('Wearable data synced!');
}

function startGuidedWorkout() {
    const audio = document.getElementById('workoutAudio');
    audio.play();
    alert('Guided workout started! Follow along with the audio cues.');
    setTimeout(() => audio.pause(), 30000);
}

document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    document.getElementById('themeToggle').textContent = document.body.classList.contains('dark-theme') ? 'Light Mode' : 'Dark Mode';
});

window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('themeToggle').textContent = 'Light Mode';
    }
});
