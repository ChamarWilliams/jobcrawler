// Sample chat messages
const sampleChatMessages = [
    {
        role: "assistant",
        content: "Hi! I'm your job search assistant. Tell me what you're looking for, and I'll help you find the perfect opportunity."
    },
    {
        role: "user",
        content: "I'm interested in remote Python internships"
    },
    {
        role: "assistant",
        content: "Great! I've updated your search to show remote Python internships. I found 8 matches that are a great fit for your skills. The top match is a Python Developer Internship at CloudNative Systems with a 95% skills match. Would you like me to refine the search further?"
    }
];

// Sample job data
const sampleJobs = [
    {
        id: 1,
        title: "Python Developer Internship",
        company: "CloudNative Systems",
        location: "Remote",
        work_type: "Remote",
        skills_required: ["Python", "JavaScript", "Git"],
        skills_match: 95,
        salary_range: "$15-18/hr",
        posted_date: "2 days ago",
        source: "LinkedIn",
        description: "Seeking Python developer to build backend services"
    },
    {
        id: 2,
        title: "DevOps Engineer (Entry-level)",
        company: "Infrastructure Corp",
        location: "San Francisco, CA",
        work_type: "Hybrid",
        skills_required: ["Docker", "Kubernetes", "AWS", "Node.js"],
        skills_match: 87,
        salary_range: "$60-75k/year",
        posted_date: "1 day ago",
        source: "Indeed",
        description: "Help us manage cloud infrastructure"
    },
    {
        id: 3,
        title: "Game Systems Developer",
        company: "Aspiere Studios",
        location: "Philadelphia, PA",
        work_type: "On-site",
        skills_required: ["Lua", "C++", "Networking"],
        skills_match: 92,
        salary_range: "$16-20/hr",
        posted_date: "3 days ago",
        source: "We Work Remotely",
        description: "Develop game systems and combat mechanics"
    },
    {
        id: 4,
        title: "Backend Engineer Intern",
        company: "Tech Innovations",
        location: "Remote",
        work_type: "Remote",
        skills_required: ["JavaScript", "Node.js", "SQL", "REST APIs"],
        skills_match: 88,
        salary_range: "$14-17/hr",
        posted_date: "4 days ago",
        source: "LinkedIn",
        description: "Build scalable backend services"
    },
    {
        id: 5,
        title: "Cloud Engineering Intern",
        company: "CloudNative Systems",
        location: "New York, NY",
        work_type: "Hybrid",
        skills_required: ["AWS", "Docker", "Python"],
        skills_match: 91,
        salary_range: "$16-19/hr",
        posted_date: "1 day ago",
        source: "Indeed",
        description: "Work with cloud infrastructure and DevOps"
    },
    {
        id: 6,
        title: "Full Stack Developer",
        company: "WebTech Solutions",
        location: "Remote",
        work_type: "Remote",
        skills_required: ["JavaScript", "React", "Node.js", "SQL"],
        skills_match: 82,
        salary_range: "$15-18/hr",
        posted_date: "5 days ago",
        source: "We Work Remotely",
        description: "Build web applications end-to-end"
    },
    {
        id: 7,
        title: "Backend Developer Internship",
        company: "TechStartup Inc",
        location: "Philadelphia, PA",
        work_type: "On-site",
        skills_required: ["Python", "SQL", "APIs"],
        skills_match: 85,
        salary_range: "$14-16/hr",
        posted_date: "1 day ago",
        source: "AngelList",
        description: "Join our engineering team building SaaS platform"
    },
    {
        id: 8,
        title: "Junior Software Engineer",
        company: "DataSystems Corp",
        location: "New York, NY",
        work_type: "Hybrid",
        skills_required: ["C++", "Python", "Git"],
        skills_match: 80,
        salary_range: "$65-80k/year",
        posted_date: "2 days ago",
        source: "Stack Overflow Jobs",
        description: "Work on data processing systems"
    },
    {
        id: 9,
        title: "Network Engineer Intern",
        company: "CloudOps Pro",
        location: "San Francisco, CA",
        work_type: "Hybrid",
        skills_required: ["Networking", "Docker", "AWS"],
        skills_match: 78,
        salary_range: "$17-20/hr",
        posted_date: "3 days ago",
        source: "Glassdoor",
        description: "Support cloud infrastructure team"
    },
    {
        id: 10,
        title: "Game Developer",
        company: "GameStudio XYZ",
        location: "Remote",
        work_type: "Remote",
        skills_required: ["C++", "Lua", "JavaScript"],
        skills_match: 89,
        salary_range: "$16-19/hr",
        posted_date: "1 day ago",
        source: "LinkedIn",
        description: "Build gameplay systems for multiplayer games"
    }
];

// Application state
let appState = {
    currentTheme: 'dark-modern',
    jobs: sampleJobs,
    filteredJobs: [],
    currentFilter: 'all',
    currentSort: 'match',
    isCrawling: false,
    crawlProgress: 0,
    charts: {},
    selectedLocations: [],
    chatMessages: [],
    isProcessing: false
};

// DOM elements
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbar-menu');
const exportBtn = document.getElementById('export-btn');
const sortSelect = document.getElementById('sort-select');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send-btn');
const jobList = document.getElementById('job-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const quickPromptBtns = document.querySelectorAll('.quick-prompt-btn');
const jobCount = document.getElementById('job-count');
const crawlerStatus = document.getElementById('crawler-status');

// Initialize app
function init() {
    // Load initial chat messages
    addChatMessage('assistant', sampleChatMessages[0].content);
    
    // Set initial theme
    setTheme(appState.currentTheme);
    
    // Event listeners
    if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu if open
                navbarMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    chatSendBtn.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
    
    quickPromptBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            chatInput.value = btn.dataset.prompt;
            sendChatMessage();
        });
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => handleFilterClick(btn));
    });
    
    exportBtn.addEventListener('click', exportToCSV);
    sortSelect.addEventListener('change', handleSort);
    
    // Initial render
    filterAndRenderJobs();
    updateJobCount();
}

// Add chat message
function addChatMessage(role, content) {
    appState.chatMessages.push({ role, content });
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message chat-message--${role}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = content;
    
    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send chat message
function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message || appState.isProcessing) return;
    
    // Add user message
    addChatMessage('user', message);
    chatInput.value = '';
    
    // Process message and respond
    appState.isProcessing = true;
    
    setTimeout(() => {
        const response = processUserMessage(message);
        addChatMessage('assistant', response);
        appState.isProcessing = false;
    }, 800);
}

// Process user message and update jobs
function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Detect job type preferences
    if (lowerMessage.includes('remote')) {
        appState.currentFilter = 'Remote';
        updateFilterButtons();
        filterAndRenderJobs();
        
        const remoteJobs = appState.filteredJobs.length;
        return `I've filtered to show ${remoteJobs} remote positions. ${remoteJobs > 0 ? `The top match is "${appState.filteredJobs[0].title}" at ${appState.filteredJobs[0].company} with a ${appState.filteredJobs[0].skills_match}% skills match.` : 'Try adjusting your search criteria.'}`;
    }
    
    if (lowerMessage.includes('hybrid')) {
        appState.currentFilter = 'Hybrid';
        updateFilterButtons();
        filterAndRenderJobs();
        
        const hybridJobs = appState.filteredJobs.length;
        return `I found ${hybridJobs} hybrid positions for you. These offer a nice balance of remote and office work.`;
    }
    
    if (lowerMessage.includes('on-site') || lowerMessage.includes('onsite') || lowerMessage.includes('office')) {
        appState.currentFilter = 'On-site';
        updateFilterButtons();
        filterAndRenderJobs();
        
        const onsiteJobs = appState.filteredJobs.length;
        return `Showing ${onsiteJobs} on-site positions. These are great for in-person collaboration and networking.`;
    }
    
    // Skills-based filtering
    if (lowerMessage.includes('python')) {
        const pythonJobs = appState.jobs.filter(job => 
            job.skills_required.some(skill => skill.toLowerCase().includes('python'))
        );
        appState.filteredJobs = pythonJobs;
        appState.currentFilter = 'all';
        updateFilterButtons();
        renderJobs();
        
        return `I found ${pythonJobs.length} positions that require Python skills. The highest match is "${pythonJobs[0].title}" at ${pythonJobs[0].company}.`;
    }
    
    if (lowerMessage.includes('game') || lowerMessage.includes('gaming')) {
        const gameJobs = appState.jobs.filter(job => 
            job.title.toLowerCase().includes('game') || 
            job.company.toLowerCase().includes('game') ||
            job.company.toLowerCase().includes('studio')
        );
        appState.filteredJobs = gameJobs;
        appState.currentFilter = 'all';
        updateFilterButtons();
        renderJobs();
        
        return `I found ${gameJobs.length} game development positions. These roles are perfect for building the next generation of interactive experiences!`;
    }
    
    if (lowerMessage.includes('devops') || lowerMessage.includes('cloud')) {
        const devopsJobs = appState.jobs.filter(job => 
            job.title.toLowerCase().includes('devops') || 
            job.title.toLowerCase().includes('cloud') ||
            job.skills_required.some(skill => ['docker', 'kubernetes', 'aws'].includes(skill.toLowerCase()))
        );
        appState.filteredJobs = devopsJobs;
        appState.currentFilter = 'all';
        updateFilterButtons();
        renderJobs();
        
        return `I've filtered to ${devopsJobs.length} DevOps and cloud engineering roles. These positions are in high demand and offer great career growth!`;
    }
    
    // Location-based
    if (lowerMessage.includes('philadelphia') || lowerMessage.includes('philly')) {
        const phillyJobs = appState.jobs.filter(job => 
            job.location.toLowerCase().includes('philadelphia')
        );
        appState.filteredJobs = phillyJobs;
        appState.currentFilter = 'all';
        updateFilterButtons();
        renderJobs();
        
        return `Found ${phillyJobs.length} positions in the Philadelphia area. These offer great opportunities in the local tech scene!`;
    }
    
    // Default response
    appState.currentFilter = 'all';
    updateFilterButtons();
    filterAndRenderJobs();
    
    return `I'm showing you all ${appState.jobs.length} available positions. You can ask me to filter by work type (remote, hybrid, on-site), skills (Python, DevOps, etc.), or location. What interests you most?`;
}

// Update filter buttons
function updateFilterButtons() {
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === appState.currentFilter) {
            btn.classList.add('filter-btn--active');
        } else {
            btn.classList.remove('filter-btn--active');
        }
    });
}

// Handle filter button clicks
function handleFilterClick(btn) {
    appState.currentFilter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');
    filterAndRenderJobs();
    
    // Add AI acknowledgment
    const filterName = appState.currentFilter === 'all' ? 'all positions' : `${appState.currentFilter} positions`;
    addChatMessage('assistant', `I've updated the view to show ${filterName}. ${appState.filteredJobs.length} jobs match your criteria.`);
}

// Update job count
function updateJobCount() {
    jobCount.textContent = `${appState.jobs.length} jobs`;
}

// Legacy functions (kept for compatibility)
function startCrawl() {}
function stopCrawl() {}
function finishCrawl() {}
function updateStatus() {}
function updateProgress() {}
function updateCounts() {}
function updateLastUpdated() {}

// Legacy: Handle tab clicks
function handleTabClick(clickedTab) {
    if (!clickedTab) return;
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('tab--active'));
    clickedTab.classList.add('tab--active');
    
    appState.currentFilter = clickedTab.dataset.filter;
    filterAndRenderJobs();
}

// Filter and render jobs
function filterAndRenderJobs() {
    // Filter jobs
    if (appState.currentFilter === 'all') {
        appState.filteredJobs = [...appState.jobs];
    } else {
        appState.filteredJobs = appState.jobs.filter(job => 
            job.work_type === appState.currentFilter
        );
    }
    
    // Sort jobs
    sortJobs();
    
    // Render jobs
    renderJobs();
}

// Sort jobs
function sortJobs() {
    switch (appState.currentSort) {
        case 'match':
            appState.filteredJobs.sort((a, b) => b.skills_match - a.skills_match);
            break;
        case 'date':
            appState.filteredJobs.sort((a, b) => {
                const getDays = (str) => parseInt(str.match(/\d+/)[0]);
                return getDays(a.posted_date) - getDays(b.posted_date);
            });
            break;
        case 'location':
            appState.filteredJobs.sort((a, b) => a.work_type.localeCompare(b.work_type));
            break;
    }
}

// Handle sort change
function handleSort() {
    appState.currentSort = sortSelect.value;
    filterAndRenderJobs();
}

// Render jobs
function renderJobs() {
    if (appState.filteredJobs.length === 0) {
        jobList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📭</div><p class="empty-state-text">No jobs found matching your criteria</p></div>';
        return;
    }
    
    jobList.innerHTML = appState.filteredJobs.map(job => `
        <div class="job-item" onclick="viewJobDetails(${job.id})">
            <div class="job-item-header">
                <div>
                    <h3 class="job-item-title">${job.title}</h3>
                    <div class="job-item-company">${job.company}</div>
                    <div class="job-item-location">📍 ${job.location}</div>
                </div>
                <span class="work-type-badge work-type-badge--${job.work_type.toLowerCase().replace('-', '')}">${job.work_type}</span>
            </div>
            <div class="job-item-meta">
                <div class="job-item-match">
                    <span style="font-weight: var(--font-weight-semibold); color: var(--color-success);">${job.skills_match}%</span>
                    <div class="match-bar">
                        <div class="match-bar-fill" style="width: ${job.skills_match}%;"></div>
                    </div>
                </div>
                <div>💰 ${job.salary_range}</div>
                <div>🕒 ${job.posted_date}</div>
            </div>
        </div>
    `).join('');
    
    updateJobCount();
}

// Legacy render for old grid
function renderJobsOld() {
    const resultsGrid = document.getElementById('results-grid');
    if (!resultsGrid) return;
    
    if (appState.filteredJobs.length === 0) {
        resultsGrid.innerHTML = '<div class="empty-state"><div class="empty-state__icon">📭</div><p>No jobs found matching your criteria</p></div>';
        return;
    }
    
    resultsGrid.innerHTML = appState.filteredJobs.map(job => `
        <div class="job-card">
            <div class="job-card__header">
                <div>
                    <h4 class="job-card__title">${job.title}</h4>
                    <div class="job-card__company">${job.company}</div>
                    <div class="job-card__location">📍 ${job.location}</div>
                </div>
                <span class="badge badge--${job.work_type.toLowerCase()}">${job.work_type}</span>
            </div>
            
            <div class="job-card__details">
                <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                    💰 ${job.salary_range}
                </div>
                <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                    🕒 Posted ${job.posted_date}
                </div>
                <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                    🛠️ ${job.skills_required.join(', ')}
                </div>
                <div class="job-card__source">
                    <span>🌐</span>
                    <span>${job.source}</span>
                </div>
            </div>
            
            <div class="skills-match">
                <span style="font-weight: var(--font-weight-medium); color: var(--color-success);">${job.skills_match}% Match</span>
                <div class="skills-match__bar">
                    <div class="skills-match__fill" style="width: ${job.skills_match}%;"></div>
                </div>
            </div>
            
            <div class="job-card__footer">
                <button class="btn btn--primary btn--sm" onclick="applyToJob(${job.id})">Apply Now</button>
                <button class="btn btn--secondary btn--sm" onclick="viewJobDetails(${job.id})">Details</button>
            </div>
        </div>
    `).join('');
}

// Apply to job
function applyToJob(jobId) {
    const job = appState.jobs.find(j => j.id === jobId);
    if (job) {
        alert(`Opening application page for ${job.title} at ${job.company}...\n\nIn a real application, this would redirect to the job posting.`);
    }
}

// View job details
function viewJobDetails(jobId) {
    const job = appState.jobs.find(j => j.id === jobId);
    if (job) {
        alert(`${job.title}\n${job.company}\n\n${job.description}\n\nRequired Skills: ${job.skills_required.join(', ')}\nLocation: ${job.location}\nType: ${job.work_type}\nSalary: ${job.salary_range}`);
    }
}

// Save configuration
function saveConfig() {
    alert('Configuration saved! In a real application, this would be saved to a backend service.');
}

// Export to CSV
function exportToCSV() {
    if (appState.jobs.length === 0) {
        alert('No jobs to export. Start a crawl first!');
        return;
    }
    
    const headers = ['Title', 'Company', 'Location', 'Work Type', 'Skills', 'Match %', 'Salary', 'Posted', 'Source'];
    const rows = appState.jobs.map(job => [
        job.title,
        job.company,
        job.location,
        job.work_type,
        job.skills_required.join('; '),
        job.skills_match,
        job.salary_range,
        job.posted_date,
        job.source
    ]);
    
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
        csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'job-crawler-results.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Initialize charts (legacy - hidden)
function initCharts() {}

// Set theme (simplified)
function setTheme(theme) {
    appState.currentTheme = theme;
    // Theme handled by design system
}

// Toggle mobile menu
function toggleMobileMenu() {
    navbarMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Initialize the app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}