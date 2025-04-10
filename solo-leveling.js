let hunter = {
    name: '',
    class: '',
    level: 1,
    exp: 0,
    expToNext: 100,
    rank: 'E',
    stats: {
        strength: 10,
        endurance: 10,
        intelligence: 10,
        agility: 10,
        vitality: 10
    },
    baseStats: {
        strength: 10,
        endurance: 10,
        intelligence: 10,
        agility: 10,
        vitality: 10
    },
    bonusStats: {
        strength: 0,
        endurance: 0,
        intelligence: 0,
        agility: 0,
        vitality: 0
    },
    statPoints: 0,
    equipment: {
        weapon: null,
        armor: null,
        accessory: null
    },
    skills: [],
    gold: 500,
    crystals: 5,
    inventory: [],
    dailyQuests: [],
    weeklyQuests: [],
    completedQuests: 0,
    streak: 0,
    dungeonCooldowns: {}
};

const ranks = ['E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS'];

// Class definitions with stat bonuses
const hunterClasses = {
    'tank': {
        name: 'Tank',
        bonuses: {
            strength: 10,
            endurance: 5,
            agility: -2
        },
        description: 'High health and defense, specializes in absorbing damage',
        startingSkill: {
            name: 'Iron Body',
            description: 'Reduces damage taken by 10%',
            icon: '🛡️'
        }
    },
    'scout': {
        name: 'Scout',
        bonuses: {
            agility: 10,
            endurance: 5,
            strength: -2
        },
        description: 'High speed and reflexes, good at avoiding damage',
        startingSkill: {
            name: 'Swift Movement',
            description: 'Increases movement speed by 15%',
            icon: '💨'
        }
    },
    'mage': {
        name: 'Mage',
        bonuses: {
            intelligence: 10,
            agility: 5,
            endurance: -2
        },
        description: 'High mana and magic abilities',
        startingSkill: {
            name: 'Mana Surge',
            description: 'Increases mana regeneration by 20%',
            icon: '✨'
        }
    },
    'assassin': {
        name: 'Assassin',
        bonuses: {
            strength: 8,
            agility: 8,
            intelligence: -3
        },
        description: 'Balanced physical stats with high burst damage',
        startingSkill: {
            name: 'Shadow Strike',
            description: 'First attack deals 25% more damage',
            icon: '🗡️'
        }
    }
};

// Daily quests templates - health-focused
const dailyQuestTemplates = [
    { name: 'Drink Water', description: 'Drink 8 glasses of water today', exp: 20, gold: 50, difficulty: 'easy' },
    { name: 'Morning Stretches', description: 'Do 5 minutes of stretching after waking up', exp: 15, gold: 40, difficulty: 'easy' },
    { name: 'Walk', description: 'Take a 15-minute walk', exp: 25, gold: 60, difficulty: 'easy' },
    { name: 'Meditate', description: 'Practice 5 minutes of mindfulness meditation', exp: 20, gold: 50, difficulty: 'easy' },
    { name: 'Posture Check', description: 'Fix your sitting posture 5 times today', exp: 15, gold: 40, difficulty: 'easy' },
    { name: 'Sleep Early', description: 'Go to bed before 11 PM', exp: 30, gold: 70, difficulty: 'medium' },
    { name: 'No Snacks', description: 'Avoid unhealthy snacks for the day', exp: 35, gold: 80, difficulty: 'medium' },
    { name: 'Push-ups', description: 'Complete 3 sets of push-ups (any amount you can do)', exp: 35, gold: 80, difficulty: 'medium' },
    { name: 'Plank Challenge', description: 'Hold a plank position for 30 seconds', exp: 30, gold: 70, difficulty: 'medium' },
    { name: 'Deep Breathing', description: 'Practice deep breathing exercises for 3 minutes', exp: 25, gold: 60, difficulty: 'medium' },
    { name: 'Full Workout', description: 'Complete a 30-minute full body workout', exp: 50, gold: 100, difficulty: 'hard' },
    { name: 'Meal Prep', description: 'Prepare healthy meals for tomorrow', exp: 45, gold: 90, difficulty: 'hard' },
    { name: 'Run', description: 'Go for a 20-minute run', exp: 50, gold: 100, difficulty: 'hard' },
    { name: 'Digital Detox', description: 'Avoid social media for 3 hours', exp: 40, gold: 85, difficulty: 'hard' },
    { name: 'Hydration Master', description: 'Drink 12 glasses of water today', exp: 45, gold: 90, difficulty: 'hard' }
];

// Weekly quest templates - bigger health goals
const weeklyQuestTemplates = [
    { name: 'Active Week', description: 'Exercise at least 3 days this week', exp: 100, gold: 250, crystals: 1, difficulty: 'medium' },
    { name: 'Sleep Schedule', description: 'Maintain a consistent sleep schedule for 5 days', exp: 120, gold: 300, crystals: 1, difficulty: 'medium' },
    { name: 'Meditation Master', description: 'Meditate for at least 5 minutes every day this week', exp: 150, gold: 350, crystals: 2, difficulty: 'hard' },
    { name: 'Strength Builder', description: 'Complete 100 push-ups over the course of the week', exp: 200, gold: 400, crystals: 2, difficulty: 'hard' },
    { name: 'Endurance Training', description: 'Run or walk for a total of 10 miles this week', exp: 250, gold: 500, crystals: 3, difficulty: 'very hard' }
];

// Equipment database
const equipmentDatabase = {
    weapons: [
        { id: 'w1', name: 'Basic Sword', type: 'weapon', rarity: 'common', stats: { strength: 5 }, price: 200, description: 'A simple but effective blade' },
        { id: 'w2', name: 'Hunter Bow', type: 'weapon', rarity: 'common', stats: { agility: 5 }, price: 200, description: 'Standard issue ranged weapon' },
        { id: 'w3', name: 'Magic Staff', type: 'weapon', rarity: 'common', stats: { intelligence: 5 }, price: 200, description: 'Focuses magical energy' },
        { id: 'w4', name: 'Tempest Blade', type: 'weapon', rarity: 'uncommon', stats: { strength: 8, agility: 3 }, price: 500, description: 'Wind-enchanted blade that cuts with precision' },
        { id: 'w5', name: 'Runic Wand', type: 'weapon', rarity: 'uncommon', stats: { intelligence: 8, vitality: 3 }, price: 500, description: 'Ancient runes boost magical capability' },
        { id: 'w6', name: 'Dragon Fang Dagger', type: 'weapon', rarity: 'rare', stats: { strength: 10, agility: 8 }, price: 1200, crystals: 1, description: 'Carved from a dragon\'s tooth' }
    ],
    armor: [
        { id: 'a1', name: 'Leather Armor', type: 'armor', rarity: 'common', stats: { endurance: 5 }, price: 200, description: 'Basic protection for hunters' },
        { id: 'a2', name: 'Scout Cloak', type: 'armor', rarity: 'common', stats: { agility: 3, endurance: 2 }, price: 200, description: 'Light protection that doesn\'t slow you down' },
        { id: 'a3', name: 'Mage Robes', type: 'armor', rarity: 'common', stats: { intelligence: 3, vitality: 2 }, price: 200, description: 'Enhances magical capabilities' },
        { id: 'a4', name: 'Reinforced Plate', type: 'armor', rarity: 'uncommon', stats: { endurance: 8, strength: 3 }, price: 500, description: 'Heavy but effective protection' },
        { id: 'a5', name: 'Shadow Garb', type: 'armor', rarity: 'uncommon', stats: { agility: 8, vitality: 3 }, price: 500, description: 'Almost invisible in the shadows' },
        { id: 'a6', name: 'Arcanist Vestments', type: 'armor', rarity: 'rare', stats: { intelligence: 10, vitality: 8 }, price: 1200, crystals: 1, description: 'Woven with magical thread' }
    ],
    accessories: [
        { id: 'acc1', name: 'Vitality Ring', type: 'accessory', rarity: 'common', stats: { vitality: 5 }, price: 150, description: 'Enhances life force' },
        { id: 'acc2', name: 'Agility Bracelet', type: 'accessory', rarity: 'common', stats: { agility: 5 }, price: 150, description: 'Lightweight and flexible' },
        { id: 'acc3', name: 'Focus Pendant', type: 'accessory', rarity: 'common', stats: { intelligence: 5 }, price: 150, description: 'Helps concentrate magical energy' },
        { id: 'acc4', name: 'Warrior\'s Emblem', type: 'accessory', rarity: 'uncommon', stats: { strength: 5, endurance: 5 }, price: 400, description: 'Mark of a true warrior' },
        { id: 'acc5', name: 'Shadow Talisman', type: 'accessory', rarity: 'uncommon', stats: { agility: 5, vitality: 5 }, price: 400, description: 'Makes movements hard to predict' },
        { id: 'acc6', name: 'Archmage Amulet', type: 'accessory', rarity: 'rare', stats: { intelligence: 8, vitality: 5 }, price: 1000, crystals: 1, description: 'Worn by the greatest mages' }
    ]
};

// Available dungeons
const dungeons = [
    { 
        id: 'dungeon1', 
        name: 'Training Grounds', 
        description: 'A basic dungeon for new hunters', 
        level: 1, 
        difficultyRating: 'E',
        timeToComplete: 30, // seconds for simulation
        cooldown: 2, // hours
        rewards: {
            exp: 50,
            gold: 100,
            loot: ['Basic supplies']
        }
    },
    { 
        id: 'dungeon2', 
        name: 'Forest of Trials', 
        description: 'Test your skills among the ancient trees', 
        level: 5, 
        difficultyRating: 'D',
        timeToComplete: 45, // seconds for simulation
        cooldown: 4, // hours
        rewards: {
            exp: 120,
            gold: 250,
            loot: ['Forest herbs', 'Chance of uncommon equipment']
        }
    },
    { 
        id: 'dungeon3', 
        name: 'Corrupted Catacombs', 
        description: 'Dark forces have taken over these ancient tombs', 
        level: 10, 
        difficultyRating: 'C',
        timeToComplete: 60, // seconds for simulation
        cooldown: 8, // hours
        rewards: {
            exp: 300,
            gold: 500,
            crystals: 1,
            loot: ['Ancient relics', 'Chance of rare equipment']
        }
    }
];

// Quotes database
const quotes = [
    "I alone level up.",
    "The weak fear the strong and the strong seek the stronger.",
    "Being weak is nothing to be ashamed of. Staying weak is.",
    "A rank is just a number. What matters is your will to grow stronger.",
    "The road to power is paved with sacrifice.",
    "In this world, you must arise or you will fall.",
    "Your true potential lies beyond your limits.",
    "The only one who can determine your ceiling is yourself.",
    "Battles are won before they are fought.",
    "What doesn't kill me... makes me stronger."
];

// System initialization
function init() {
    // Show intro screen
    document.getElementById('nameEntry').style.display = 'flex';
    document.getElementById('classSelection').style.display = 'none';
    document.getElementById('main').style.display = 'none';
    
    // Set a random quote
    document.getElementById('welcomeQuote').textContent = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;
    
    // Set up theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Load hunter data from local storage if exists
    loadGame();
}

// Load game data from local storage
function loadGame() {
    const savedHunter = localStorage.getItem('hunterData');
    if (savedHunter) {
        hunter = JSON.parse(savedHunter);
        
        // If hunter has a name, skip intro
        if (hunter.name && hunter.class) {
            updateAllDisplays();
            showDashboard();
            document.getElementById('nameEntry').style.display = 'none';
            document.getElementById('classSelection').style.display = 'none';
            document.getElementById('main').style.display = 'block';
        }
    } else {
        // Initialize new hunter with random quests
        generateDailyQuests();
        generateWeeklyQuests();
        saveGame();
    }
}

// Save game data to local storage
function saveGame() {
    localStorage.setItem('hunterData', JSON.stringify(hunter));
}

// Proceed from name entry to class selection
function proceedToClass() {
    const nameInput = document.getElementById('userName').value.trim();
    if (nameInput) {
        hunter.name = nameInput;
        document.getElementById('nameEntry').style.display = 'none';
        document.getElementById('classSelection').style.display = 'block';
        saveGame();
    } else {
        alert('Please enter your name, Hunter!');
    }
}

// Select a class and proceed to main game
function selectClass(classId) {
    if (hunterClasses[classId]) {
        // Apply class bonuses to base stats
        hunter.class = hunterClasses[classId].name;
        const bonuses = hunterClasses[classId].bonuses;
        
        // Update base stats with class bonuses
        for (const stat in bonuses) {
            hunter.baseStats[stat] += bonuses[stat];
        }
        
        // Sync total stats with base stats
        for (const stat in hunter.stats) {
            hunter.stats[stat] = hunter.baseStats[stat] + hunter.bonusStats[stat];
        }
        
        // Add starting skill
        hunter.skills.push(hunterClasses[classId].startingSkill);
        
        // Add starter equipment based on class
        addStarterEquipment(classId);
        
        // Save and proceed to main game
        saveGame();
        updateAllDisplays();
        document.getElementById('classSelection').style.display = 'none';
        document.getElementById('main').style.display = 'block';
        showDashboard();
        
        // Add welcome message
        addSystemMessage(`Welcome, ${hunter.name}! You have awakened as a ${hunter.class}.`);
    }
}

// Add starter equipment based on class
function addStarterEquipment(classId) {
    let weapon, armor;
    
    switch(classId) {
        case 'tank':
            weapon = equipmentDatabase.weapons.find(w => w.id === 'w1'); // Basic Sword
            armor = equipmentDatabase.armor.find(a => a.id === 'a1'); // Leather Armor
            break;
        case 'scout':
            weapon = equipmentDatabase.weapons.find(w => w.id === 'w2'); // Hunter Bow
            armor = equipmentDatabase.armor.find(a => a.id === 'a2'); // Scout Cloak
            break;
        case 'mage':
            weapon = equipmentDatabase.weapons.find(w => w.id === 'w3'); // Magic Staff
            armor = equipmentDatabase.armor.find(a => a.id === 'a3'); // Mage Robes
            break;
        case 'assassin':
            weapon = equipmentDatabase.weapons.find(w => w.id === 'w4'); // Tempest Blade
            armor = equipmentDatabase.armor.find(a => a.id === 'a2'); // Scout Cloak
            break;
    }
    
    if (weapon) {
        equipItem(weapon);
    }
    
    if (armor) {
        equipItem(armor);
    }
}

// Generate random daily quests
function generateDailyQuests() {
    hunter.dailyQuests = [];
    
    // Generate 3 random quests of different difficulty
    const easyCandidates = dailyQuestTemplates.filter(q => q.difficulty === 'easy');
    const mediumCandidates = dailyQuestTemplates.filter(q => q.difficulty === 'medium');
    const hardCandidates = dailyQuestTemplates.filter(q => q.difficulty === 'hard');
    
    // Select one of each difficulty
    const easyQuest = easyCandidates[Math.floor(Math.random() * easyCandidates.length)];
    const mediumQuest = mediumCandidates[Math.floor(Math.random() * mediumCandidates.length)];
    const hardQuest = hardCandidates[Math.floor(Math.random() * hardCandidates.length)];
    
    // Clone the quests and add to daily quests
    hunter.dailyQuests.push({ ...easyQuest, completed: false, id: 'daily-1' });
    hunter.dailyQuests.push({ ...mediumQuest, completed: false, id: 'daily-2' });
    hunter.dailyQuests.push({ ...hardQuest, completed: false, id: 'daily-3' });
}

// Generate random weekly quests
function generateWeeklyQuests() {
    hunter.weeklyQuests = [];
    
    // Generate 2 random weekly quests
    const shuffled = [...weeklyQuestTemplates].sort(() => 0.5 - Math.random());
    
    // Select first two quests
    const weeklyQuest1 = shuffled[0];
    const weeklyQuest2 = shuffled[1];
    
    // Clone the quests and add to weekly quests
    hunter.weeklyQuests.push({ ...weeklyQuest1, completed: false, id: 'weekly-1' });
    hunter.weeklyQuests.push({ ...weeklyQuest2, completed: false, id: 'weekly-2' });
}

// Update all displays
function updateAllDisplays() {
    updateDashboard();
    updateProfile();
    updateInventory();
    updateDungeon();
}

// Show dashboard
function showDashboard() {
    hideAllSections();
    document.getElementById('dashboard').style.display = 'block';
    updateDashboard();
}

// Show profile
function showProfile() {
    hideAllSections();
    document.getElementById('profile').style.display = 'block';
    updateProfile();
}

// Show inventory
function showInventory() {
    hideAllSections();
    document.getElementById('inventory').style.display = 'block';
    updateInventory();
}

// Show dungeon
function showDungeon() {
    hideAllSections();
    document.getElementById('dungeon').style.display = 'block';
    updateDungeon();
}

// Show shop
function showShop() {
    hideAllSections();
    document.getElementById('shop').style.display = 'block';
    updateShop();
}

// Hide all main sections
function hideAllSections() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
    document.getElementById('inventory').style.display = 'none';
    document.getElementById('dungeon').style.display = 'none';
    document.getElementById('shop').style.display = 'none';
}

// Update dashboard display
function updateDashboard() {
    // Update player info
    document.getElementById('dashName').textContent = hunter.name;
    document.getElementById('className').textContent = hunter.class;
    document.getElementById('level').textContent = hunter.level;
    document.getElementById('rank').textContent = hunter.rank;
    document.getElementById('exp').textContent = `${hunter.exp}/${hunter.expToNext}`;
    
    // Update daily quests
    const dailyQuestsContainer = document.getElementById('dailyQuests');
    dailyQuestsContainer.innerHTML = '';
    
    hunter.dailyQuests.forEach(quest => {
        const questElement = document.createElement('div');
        questElement.className = `quest-item p-3 bg-zinc-800 rounded-lg ${quest.completed ? 'quest-complete' : ''}`;
        questElement.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <h4 class="font-bold ${quest.completed ? 'text-green-400' : 'text-blue-400'}">${quest.name}</h4>
                    <p class="text-sm text-gray-400">${quest.description}</p>
                </div>
                <div class="flex flex-col items-end">
                    <span class="text-xs text-gray-500">Rewards</span>
                    <div class="flex space-x-2 text-xs">
                        <span class="text-yellow-400">${quest.gold} Gold</span>
                        <span class="text-green-400">${quest.exp} EXP</span>
                    </div>
                    <div class="mt-2">
                        <label class="inline-flex items-center">
                            <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" ${quest.completed ? 'checked' : ''}
                                onchange="toggleQuestCompletion('${quest.id}')">
                            <span class="ml-2 text-sm ${quest.completed ? 'text-green-400' : 'text-gray-400'}">
                                ${quest.completed ? 'Completed' : 'Mark as completed'}
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        `;
        dailyQuestsContainer.appendChild(questElement);
    });
    
    // Update weekly quests
    const weeklyQuestsContainer = document.getElementById('weeklyQuests');
    weeklyQuestsContainer.innerHTML = '';
    
    hunter.weeklyQuests.forEach(quest => {
        const questElement = document.createElement('div');
        questElement.className = `quest-item p-3 bg-zinc-800 rounded-lg ${quest.completed ? 'quest-complete' : ''}`;
        questElement.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <h4 class="font-bold ${quest.completed ? 'text-green-400' : 'text-blue-400'}">${quest.name}</h4>
                    <p class="text-sm text-gray-400">${quest.description}</p>
                </div>
                <div class="flex flex-col items-end">
                    <span class="text-xs text-gray-500">Rewards</span>
                    <div class="flex space-x-2 text-xs">
                        <span class="text-yellow-400">${quest.gold} Gold</span>
                        <span class="text-green-400">${quest.exp} EXP</span>
                        ${quest.crystals ? `<span class="text-blue-300">${quest.crystals} Crystals</span>` : ''}
                    </div>
                    <div class="mt-2">
                        <label class="inline-flex items-center">
                            <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" ${quest.completed ? 'checked' : ''}
                                onchange="toggleQuestCompletion('${quest.id}')">
                            <span class="ml-2 text-sm ${quest.completed ? 'text-green-400' : 'text-gray-400'}">
                                ${quest.completed ? 'Completed' : 'Mark as completed'}
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        `;
        weeklyQuestsContainer.appendChild(questElement);
    });
}

// Update profile display
function updateProfile() {
    // Update character stats
    const statsContainer = document.getElementById('characterStats');
    statsContainer.innerHTML = '';
    
    const statNames = {
        strength: 'Strength',
        endurance: 'Endurance',
        intelligence: 'Intelligence',
        agility: 'Agility',
        vitality: 'Vitality'
    };
    
    for (const stat in hunter.stats) {
        const statElement = document.createElement('div');
        const baseStat = hunter.baseStats[stat];
        const bonusStat = hunter.bonusStats[stat];
        const totalStat = hunter.stats[stat];
        
        statElement.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <span class="font-semibold text-gray-300">${statNames[stat]}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-gray-400">${baseStat}</span>
                    ${bonusStat > 0 ? `<span class="text-green-400">+${bonusStat}</span>` : 
                      bonusStat < 0 ? `<span class="text-red-400">${bonusStat}</span>` : ''}
                    <span class="font-bold text-blue-400">${totalStat}</span>
                </div>
            </div>
            <div class="stat-bar">
                <div class="stat-fill" style="width: ${Math.min(totalStat, 100)}%"></div>
            </div>
        `;
        statsContainer.appendChild(statElement);
    }
    
    // Update stat points
    document.getElementById('statPoints').textContent = hunter.statPoints;
    
    // Update stat increase buttons
    const statButtonsContainer = document.getElementById('statButtons');
    statButtonsContainer.innerHTML = '';
    
    if (hunter.statPoints > 0) {
        for (const stat in hunter.baseStats) {
            const button = document.createElement('button');
            button.className = 'p-2 bg-blue-600 text-white rounded-lg btn-hover text-sm';
            button.textContent = `+1 ${statNames[stat]}`;
            button.onclick = () => increaseStat(stat);
            statButtonsContainer.appendChild(button);
        }
    }
    
    // Update equipment stats
    const equipmentStatsContainer = document.getElementById('equipmentStats');
    equipmentStatsContainer.innerHTML = '';
    
    const equipmentTypes = {
        weapon: 'Weapon',
        armor: 'Armor',
        accessory: 'Accessory'
    };
    
    for (const type in hunter.equipment) {
        const equipmentItem = hunter.equipment[type];
        const equipmentElement = document.createElement('div');
        equipmentElement.className = 'bg-zinc-700 p-3 rounded-lg';
        
        if (equipmentItem) {
            // Show equipped item
            let statsText = '';
            for (const stat in equipmentItem.stats) {
                statsText += `<span class="text-green-400">+${equipmentItem.stats[stat]} ${statNames[stat]}</span><br>`;
            }
            
            equipmentElement.innerHTML = `
                <div class="flex justify-between items-center">
                    <div>
                        <span class="text-gray-400">${equipmentTypes[type]}:</span>
                        <span class="font-semibold text-blue-400">${equipmentItem.name}</span>
                    </div>
                    <div class="text-right text-xs">
                        ${statsText}
                    </div>
                </div>
            `;
        } else {
            // Show empty slot
            equipmentElement.innerHTML = `
                <div class="text-center text-gray-500">
                    <span>${equipmentTypes[type]} Slot: Empty</span>
                </div>
            `;
        }
        
        equipmentStatsContainer.appendChild(equipmentElement);
    }
    
    // Update skills
    const skillsContainer = document.getElementById('skills');
    skillsContainer.innerHTML = '';
    
    hunter.skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'bg-zinc-700 p-3 rounded-lg';
        skillElement.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="text-2xl">${skill.icon}</div>
                <div>
                    <h4 class="font-bold text-blue-400">${skill.name}</h4>
                    <p class="text-sm text-gray-400">${skill.description}</p>
                </div>
            </div>
        `;
        skillsContainer.appendChild(skillElement);
    });
}

// Update inventory display
function updateInventory() {
    // Update gold and crystals
    document.getElementById('gold').textContent = hunter.gold;
    document.getElementById('crystals').textContent = hunter.crystals;
    
    // Update inventory items
    const inventoryContainer = document.getElementById('inventoryItems');
    inventoryContainer.innerHTML = '';
    
    // Show equipped items first
    for (const type in hunter.equipment) {
        const equippedItem = hunter.equipment[type];
        if (equippedItem) {
            const itemElement = createItemCard(equippedItem, true);
            inventoryContainer.appendChild(itemElement);
        }
    }
    
    // Show inventory items
    hunter.inventory.forEach(item => {
        const itemElement = createItemCard(item, false);
        inventoryContainer.appendChild(itemElement);
    });
}

// Create item card for inventory/shop
function createItemCard(item, isEquipped) {
    const itemElement = document.createElement('div');
    itemElement.className = `item-card item-rarity-${item.rarity}`;
    
    // Create stat description
    let statsText = '';
    for (const stat in item.stats) {
        const statName = stat.charAt(0).toUpperCase() + stat.slice(1);
        statsText += `<span class="text-green-400">+${item.stats[stat]} ${statName}</span><br>`;
    }
    
    itemElement.innerHTML = `
        <div class="flex flex-col h-full">
            <div class="mb-2">
                <h4 class="font-bold text-blue-400">${item.name}</h4>
                <span class="text-xs text-gray-400">${capitalizeFirstLetter(item.rarity)} ${item.type}</span>
            </div>
            <div class="text-xs mb-3 flex-grow">
                ${statsText}
                <p class="text-gray-400 mt-1">${item.description}</p>
            </div>
            <div class="mt-auto">
                ${isEquipped ? 
                    `<button onclick="unequipItem('${item.id}')" class="w-full p-1 bg-red-600 text-white rounded-lg text-sm btn-hover">Unequip</button>` :
                    `<button onclick="equipItem(${JSON.stringify(item)})" class="w-full p-1 bg-blue-600 text-white rounded-lg text-sm btn-hover">Equip</button>`
                }
            </div>
        </div>
    `;
    
    return itemElement;
}

// Create shop item card
function createShopItemCard(item) {
    const itemElement = document.createElement('div');
    itemElement.className = `item-card item-rarity-${item.rarity}`;
    
    // Create stat description
    let statsText = '';
    for (const stat in item.stats) {
        const statName = stat.charAt(0).toUpperCase() + stat.slice(1);
        statsText += `<span class="text-green-400">+${item.stats[stat]} ${statName}</span><br>`;
    }
    
    // Check if player can afford the item
    const hasGold = hunter.gold >= item.price;
    const hasCrystals = !item.crystals || hunter.crystals >= item.crystals;
    const canAfford = hasGold && hasCrystals;
    
    itemElement.innerHTML = `
        <div class="flex flex-col h-full">
            <div class="mb-2">
                <h4 class="font-bold text-blue-400">${item.name}</h4>
                <span class="text-xs text-gray-400">${capitalizeFirstLetter(item.rarity)} ${item.type}</span>
            </div>
            <div class="text-xs mb-3 flex-grow">
                ${statsText}
                <p class="text-gray-400 mt-1">${item.description}</p>
            </div>
            <div class="flex justify-between items-center text-sm mb-2">
                <span class="text-amber-400">${item.price} Gold</span>
                ${item.crystals ? `<span class="text-blue-300">${item.crystals} Crystals</span>` : ''}
            </div>
            <div class="mt-auto">
                <button onclick="purchaseItem(${JSON.stringify(item)})" 
                    class="w-full p-1 ${canAfford ? 'bg-amber-600' : 'bg-gray-600'} text-white rounded-lg text-sm btn-hover"
                    ${canAfford ? '' : 'disabled'}>
                    ${canAfford ? 'Purchase' : 'Cannot Afford'}
                </button>
            </div>
        </div>
    `;
    
    return itemElement;
}

// Update dungeon display
function updateDungeon() {
    const dungeonListContainer = document.getElementById('dungeonList');
    dungeonListContainer.innerHTML = '';
    
    dungeons.forEach(dungeon => {
        const isAvailable = hunter.level >= dungeon.level;
        const cooldownKey = dungeon.id;
        const onCooldown = hunter.dungeonCooldowns[cooldownKey] && hunter.dungeonCooldowns[cooldownKey] > Date.now();
        
        const dungeonElement = document.createElement('div');
        dungeonElement.className = `p-4 bg-zinc-700 rounded-lg ${isAvailable ? '' : 'opacity-50'}`;
        
        // Calculate time remaining if on cooldown
        let cooldownText = '';
        if (onCooldown) {
            const timeRemaining = Math.floor((hunter.dungeonCooldowns[cooldownKey] - Date.now()) / 1000 / 60);
            cooldownText = `<span class="text-red-400">(Cooldown: ${timeRemaining} minutes)</span>`;
        }
        
        dungeonElement.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <h4 class="font-bold text-blue-400">${dungeon.name} ${cooldownText}</h4>
                    <p class="text-sm text-gray-400">${dungeon.description}</p>
                    <div class="mt-1">
                        <span class="text-xs text-yellow-400">Difficulty: ${dungeon.difficultyRating} Rank</span>
                        <span class="text-xs text-gray-400 ml-3">Required Level: ${dungeon.level}</span>
                    </div>
                </div>
                <div>
                    <button onclick="enterDungeon('${dungeon.id}')" 
                        class="p-2 bg-blue-600 text-white rounded-lg btn-hover"
                        ${!isAvailable || onCooldown ? 'disabled' : ''}
                        style="${!isAvailable || onCooldown ? 'opacity: 0.5;' : ''}">
                        Enter
                    </button>
                </div>
            </div>
            <div class="mt-3">
                <h5 class="text-sm font-semibold text-gray-300">Rewards:</h5>
                <div class="flex space-x-3 text-xs mt-1">
                    <span class="text-green-400">${dungeon.rewards.exp} EXP</span>
                    <span class="text-amber-400">${dungeon.rewards.gold} Gold</span>
                    ${dungeon.rewards.crystals ? `<span class="text-blue-300">${dungeon.rewards.crystals} Crystals</span>` : ''}
                </div>
                <div class="text-xs text-gray-400 mt-1">
                    <span>Loot: ${dungeon.rewards.loot.join(', ')}</span>
                </div>
            </div>
        `;
        
        dungeonListContainer.appendChild(dungeonElement);
    });
}

// Update shop display
function updateShop() {
    // Update gold and crystals in shop
    document.getElementById('shopGold').textContent = hunter.gold;
    document.getElementById('shopCrystals').textContent = hunter.crystals;
    
    // Display shop items
    const shopItemsContainer = document.getElementById('shopItems');
    shopItemsContainer.innerHTML = '';
    
    // Combine all equipment types
    const allEquipment = [
        ...equipmentDatabase.weapons,
        ...equipmentDatabase.armor,
        ...equipmentDatabase.accessories
    ];
    
    // Check if player already has these items
    allEquipment.forEach(item => {
        // Skip if player has this item equipped or in inventory
        const hasItem = hunter.inventory.some(invItem => invItem.id === item.id) || 
                       (hunter.equipment.weapon && hunter.equipment.weapon.id === item.id) ||
                       (hunter.equipment.armor && hunter.equipment.armor.id === item.id) ||
                       (hunter.equipment.accessory && hunter.equipment.accessory.id === item.id);
                       
        if (!hasItem) {
            shopItemsContainer.appendChild(createShopItemCard(item));
        }
    });
}

// Toggle quest completion
function toggleQuestCompletion(questId) {
    // Find quest in daily quests
    let quest = hunter.dailyQuests.find(q => q.id === questId);
    
    // If not found, check weekly quests
    if (!quest) {
        quest = hunter.weeklyQuests.find(q => q.id === questId);
    }
    
    // Toggle completion state
    if (quest) {
        quest.completed = !quest.completed;
        updateDashboard();
        saveGame();
    }
}

// Complete all marked quests and collect rewards
function completeQuests() {
    let totalExp = 0;
    let totalGold = 0;
    let totalCrystals = 0;
    let completedCount = 0;
    
    // Process daily quests
    hunter.dailyQuests.forEach(quest => {
        if (quest.completed) {
            totalExp += quest.exp;
            totalGold += quest.gold;
            completedCount++;
        }
    });
    
    // Process weekly quests
    hunter.weeklyQuests.forEach(quest => {
        if (quest.completed) {
            totalExp += quest.exp;
            totalGold += quest.gold;
            if (quest.crystals) {
                totalCrystals += quest.crystals;
            }
            completedCount++;
        }
    });
    
    // If no quests completed, show message
    if (completedCount === 0) {
        addSystemMessage('No completed quests to claim rewards for.');
        return;
    }
    
    // Apply rewards
    hunter.exp += totalExp;
    hunter.gold += totalGold;
    hunter.crystals += totalCrystals;
    hunter.completedQuests += completedCount;
    
    // Check for level up
    checkLevelUp();
    
    // Show rewards message
    addSystemMessage(`Claimed rewards for ${completedCount} quests: +${totalExp} EXP, +${totalGold} Gold${totalCrystals > 0 ? `, +${totalCrystals} Crystals` : ''}`);
    
    // Reset completed quests
    hunter.dailyQuests = hunter.dailyQuests.map(quest => {
        if (quest.completed) {
            return { ...quest, completed: false };
        }
        return quest;
    });
    
    hunter.weeklyQuests = hunter.weeklyQuests.map(quest => {
        if (quest.completed) {
            return { ...quest, completed: false };
        }
        return quest;
    });
    
    // Update display and save
    updateAllDisplays();
    saveGame();
}

// Reset all quests
function resetQuests() {
    if (confirm('Are you sure you want to reset all quests? This will generate new quests and remove any progress on current ones.')) {
        generateDailyQuests();
        generateWeeklyQuests();
        addSystemMessage('All quests have been reset.');
        updateDashboard();
        saveGame();
    }
}

// Check for level up
function checkLevelUp() {
    while (hunter.exp >= hunter.expToNext) {
        // Level up!
        hunter.exp -= hunter.expToNext;
        hunter.level++;
        hunter.expToNext = Math.floor(hunter.expToNext * 1.5);
        hunter.statPoints += 3;
        
        // Check for rank up
        checkRankUp();
        
        addSystemMessage(`Level Up! You are now level ${hunter.level}. You gained 3 stat points.`);
    }
}

// Check for rank up
function checkRankUp() {
    const rankIndex = ranks.indexOf(hunter.rank);
    
    // Rank up conditions based on level
    if (rankIndex < ranks.length - 1) {
        const rankUpLevels = [1, 10, 20, 30, 50, 75, 100];
        
        if (hunter.level >= rankUpLevels[rankIndex]) {
            hunter.rank = ranks[rankIndex + 1];
            addSystemMessage(`Congratulations! Your rank has increased to ${hunter.rank}!`);
        }
    }
}

// Increase a stat by one point
function increaseStat(stat) {
    if (hunter.statPoints > 0) {
        hunter.baseStats[stat]++;
        hunter.stats[stat] = hunter.baseStats[stat] + hunter.bonusStats[stat];
        hunter.statPoints--;
        
        addSystemMessage(`Increased ${stat} to ${hunter.stats[stat]}.`);
        updateProfile();
        saveGame();
    }
}

// Equip an item
function equipItem(item) {
    // Determine item type and slot
    const slot = item.type;
    
    // If we already have an item in this slot, unequip it first
    if (hunter.equipment[slot]) {
        // Move current equipped item to inventory
        hunter.inventory.push(hunter.equipment[slot]);
        
        // Remove stat bonuses from current item
        for (const stat in hunter.equipment[slot].stats) {
            hunter.bonusStats[stat] -= hunter.equipment[slot].stats[stat];
            hunter.stats[stat] = hunter.baseStats[stat] + hunter.bonusStats[stat];
        }
    }
    
    // Equip new item
    hunter.equipment[slot] = item;
    
    // Add stat bonuses from new item
    for (const stat in item.stats) {
        if (!hunter.bonusStats[stat]) hunter.bonusStats[stat] = 0;
        hunter.bonusStats[stat] += item.stats[stat];
        hunter.stats[stat] = hunter.baseStats[stat] + hunter.bonusStats[stat];
    }
    
    // Remove from inventory if it was there
    hunter.inventory = hunter.inventory.filter(i => i.id !== item.id);
    
    addSystemMessage(`Equipped ${item.name}.`);
    updateAllDisplays();
    saveGame();
}

// Unequip an item
function unequipItem(itemId) {
    // Find which slot has this item
    let slot = null;
    for (const s in hunter.equipment) {
        if (hunter.equipment[s] && hunter.equipment[s].id === itemId) {
            slot = s;
            break;
        }
    }
    
    if (slot) {
        const item = hunter.equipment[slot];
        
        // Remove stat bonuses
        for (const stat in item.stats) {
            hunter.bonusStats[stat] -= item.stats[stat];
            hunter.stats[stat] = hunter.baseStats[stat] + hunter.bonusStats[stat];
        }
        
        // Move to inventory
        hunter.inventory.push(item);
        
        // Clear equipment slot
        hunter.equipment[slot] = null;
        
        addSystemMessage(`Unequipped ${item.name}.`);
        updateAllDisplays();
        saveGame();
    }
}

// Purchase an item from the shop
function purchaseItem(item) {
    // Check if player can afford it
    const hasGold = hunter.gold >= item.price;
    const hasCrystals = !item.crystals || hunter.crystals >= item.crystals;
    
    if (hasGold && hasCrystals) {
        // Deduct cost
        hunter.gold -= item.price;
        if (item.crystals) {
            hunter.crystals -= item.crystals;
        }
        
        // Add to inventory
        hunter.inventory.push(item);
        
        addSystemMessage(`Purchased ${item.name}.`);
        updateShop();
        updateInventory();
        saveGame();
    } else {
        addSystemMessage('You cannot afford this item.');
    }
}

// Enter a dungeon
function enterDungeon(dungeonId) {
    const dungeon = dungeons.find(d => d.id === dungeonId);
    
    if (!dungeon) return;
    
    // Check if player meets level requirement
    if (hunter.level < dungeon.level) {
        addSystemMessage(`You need to be level ${dungeon.level} to enter this dungeon.`);
        return;
    }
    
    // Check cooldown
    const cooldownKey = dungeon.id;
    if (hunter.dungeonCooldowns[cooldownKey] && hunter.dungeonCooldowns[cooldownKey] > Date.now()) {
        const timeRemaining = Math.floor((hunter.dungeonCooldowns[cooldownKey] - Date.now()) / 1000 / 60);
        addSystemMessage(`This dungeon is on cooldown for ${timeRemaining} more minutes.`);
        return;
    }
    
    // Show dungeon progress section
    document.getElementById('dungeonProgress').style.display = 'block';
    document.getElementById('dungeonRewards').style.display = 'none';
    document.getElementById('dungeonStatus').textContent = `Exploring ${dungeon.name}...`;
    
    // Simulate dungeon progress
    let progress = 0;
    const progressBar = document.getElementById('dungeonProgressBar');
    progressBar.style.width = '0%';
    
    const progressInterval = setInterval(() => {
        progress += 1;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            completeDungeon(dungeon);
        }
    }, dungeon.timeToComplete * 10); // Adjust time based on dungeon
}

// Complete a dungeon run
function completeDungeon(dungeon) {
    // Calculate success chance based on player level and dungeon difficulty
    const levelDifference = hunter.level - dungeon.level;
    let successChance = 0.5 + (levelDifference * 0.1); // Base 50% + 10% per level above requirement
    
    // Cap success chance between 10% and 95%
    successChance = Math.max(0.1, Math.min(0.95, successChance));
    
    // Roll for success
    const roll = Math.random();
    const success = roll <= successChance;
    
    // Set cooldown regardless of outcome
    hunter.dungeonCooldowns[dungeon.id] = Date.now() + (dungeon.cooldown * 60 * 60 * 1000); // Hours to milliseconds
    
    // Show results
    document.getElementById('dungeonStatus').textContent = success ? 
        `Dungeon Cleared! You successfully completed ${dungeon.name}.` : 
        `Dungeon Failed! You were defeated in ${dungeon.name}.`;
    
    // Show rewards section
    document.getElementById('dungeonRewards').style.display = 'block';
    const rewardsList = document.getElementById('rewardsList');
    rewardsList.innerHTML = '';
    
    if (success) {
        // Apply rewards
        const expReward = dungeon.rewards.exp;
        const goldReward = dungeon.rewards.gold;
        const crystalReward = dungeon.rewards.crystals || 0;
        
        hunter.exp += expReward;
        hunter.gold += goldReward;
        hunter.crystals += crystalReward;
        
        // Add reward items to list
        rewardsList.innerHTML += `<li class="text-green-400">+${expReward} EXP</li>`;
        rewardsList.innerHTML += `<li class="text-amber-400">+${goldReward} Gold</li>`;
        if (crystalReward > 0) {
            rewardsList.innerHTML += `<li class="text-blue-300">+${crystalReward} Crystals</li>`;
        }
        
        // Random chance for equipment drop based on dungeon level
        const equipmentChance = 0.3 + (dungeon.level * 0.02); // 30% base + 2% per dungeon level
        if (Math.random() <= equipmentChance) {
            // Select a random equipment type
            const equipmentTypes = ['weapons', 'armor', 'accessories'];
            const randomType = equipmentTypes[Math.floor(Math.random() * equipmentTypes.length)];
            
            // Filter by rarity based on dungeon difficulty
            let eligibleEquipment = [];
            if (dungeon.difficultyRating === 'E') {
                eligibleEquipment = equipmentDatabase[randomType].filter(e => e.rarity === 'common');
            } else if (dungeon.difficultyRating === 'D') {
                eligibleEquipment = equipmentDatabase[randomType].filter(e => ['common', 'uncommon'].includes(e.rarity));
            } else {
                eligibleEquipment = equipmentDatabase[randomType].filter(e => ['common', 'uncommon', 'rare'].includes(e.rarity));
            }
            
            if (eligibleEquipment.length > 0) {
                // Select a random piece of equipment
                const randomEquipment = eligibleEquipment[Math.floor(Math.random() * eligibleEquipment.length)];
                
                // Check if player already has this item
                const hasItem = hunter.inventory.some(i => i.id === randomEquipment.id) || 
                               (hunter.equipment.weapon && hunter.equipment.weapon.id === randomEquipment.id) ||
                               (hunter.equipment.armor && hunter.equipment.armor.id === randomEquipment.id) ||
                               (hunter.equipment.accessory && hunter.equipment.accessory.id === randomEquipment.id);
                
                if (!hasItem) {
                    // Add to inventory
                    hunter.inventory.push(randomEquipment);
                    rewardsList.innerHTML += `<li class="text-purple-400">New Equipment: ${randomEquipment.name} (${capitalizeFirstLetter(randomEquipment.rarity)})</li>`;
                }
            }
        }
        
        // Add dungeon-specific loot display
        dungeon.rewards.loot.forEach(loot => {
            rewardsList.innerHTML += `<li class="text-gray-300">${loot}</li>`;
        });
        
        // System message
        addSystemMessage(`Completed ${dungeon.name} successfully! Gained ${expReward} EXP and ${goldReward} Gold.`);
        
        // Check for level up
        checkLevelUp();
    } else {
        // Partial rewards for failure (50%)
        const expReward = Math.floor(dungeon.rewards.exp * 0.5);
        const goldReward = Math.floor(dungeon.rewards.gold * 0.5);
        
        hunter.exp += expReward;
        hunter.gold += goldReward;
        
        // Add partial reward items to list
        rewardsList.innerHTML += `<li class="text-green-400">+${expReward} EXP (50%)</li>`;
        rewardsList.innerHTML += `<li class="text-amber-400">+${goldReward} Gold (50%)</li>`;
        
        // System message
        addSystemMessage(`Failed to complete ${dungeon.name}. Gained ${expReward} EXP and ${goldReward} Gold.`);
        
        // Check for level up
        checkLevelUp();
    }
    
    // Update all displays and save
    updateAllDisplays();
    saveGame();
}

// Add system message
function addSystemMessage(message) {
    const messagesContainer = document.getElementById('systemMessages');
    const messageElement = document.createElement('div');
    
    // Get current time
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageElement.className = 'text-gray-300';
    messageElement.innerHTML = `<span class="text-gray-500">[${timeString}]</span> ${message}`;
    
    // Add message at the top
    messagesContainer.insertBefore(messageElement, messagesContainer.firstChild);
    
    // Limit number of messages
    if (messagesContainer.children.length > 10) {
        messagesContainer.removeChild(messagesContainer.lastChild);
    }
}

// Toggle theme between normal and shadow mode
function toggleTheme() {
    document.body.classList.toggle('shadow-mode');
    document.getElementById('themeToggle').textContent = 
        document.body.classList.contains('shadow-mode') ? 'LIGHT MODE' : 'SHADOW MODE';
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize the game
window.onload = init;