// Dynamic Inbox Page Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Demo data
    let messages = [
        {
            id: 1,
            from: 'System',
            date: '2025-12-01',
            title: 'Welcome to Khelbo!',
            body: 'Your account is ready. Enjoy the platform!',
            unread: true,
            thread: [
                {sent: false, text: 'Welcome to Khelbo! Your account is ready.', time: '2025-12-01 10:00'},
                {sent: true, text: 'Thank you!', time: '2025-12-01 10:01'}
            ]
        },
        {
            id: 2,
            from: 'Admin',
            date: '2025-11-28',
            title: 'Tournament Registration Open',
            body: 'Register now for the upcoming event!',
            unread: false,
            thread: [
                {sent: false, text: 'Tournament registration is now open!', time: '2025-11-28 09:00'}
            ]
        }
    ];
    let notifications = [
        {
            id: 1,
            title: 'System Update',
            desc: 'Platform maintenance scheduled for Dec 5th.',
            date: '2025-11-30',
            unread: true
        },
        {
            id: 2,
            title: 'Welcome!',
            desc: 'Thanks for joining Khelbo.gg.',
            date: '2025-11-25',
            unread: false
        }
    ];
    let activity = [
        {
            id: 1,
            title: 'Joined Tournament',
            desc: 'You joined the "Winter Cup" tournament.',
            date: '2025-11-28',
            unread: true
        },
        {
            id: 2,
            title: 'Profile Updated',
            desc: 'You updated your profile information.',
            date: '2025-11-20',
            unread: true
        }
    ];

    // Elements
    const messagesList = document.getElementById('messagesList');
    const notificationsList = document.getElementById('notificationsList');
    const activityList = document.getElementById('activityList');
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    const markAllNotificationsReadBtn = document.getElementById('markAllNotificationsReadBtn');
    const markAllActivityReadBtn = document.getElementById('markAllActivityReadBtn');
    const tabs = document.querySelectorAll('.inbox-tab');
    const sections = document.querySelectorAll('.inbox-section');
    const searchInput = document.getElementById('inboxSearch');
    const chatBox = document.getElementById('chatBox');
    const chatThread = document.getElementById('chatThread');
    const chatInputRow = document.getElementById('chatInputRow');
    const chatInput = document.getElementById('chatInput');
    const closeChatBtn = document.getElementById('closeChatBtn');

    // Renderers
    function renderMessages(filter = '') {
        messagesList.innerHTML = '';
        let filtered = messages.filter(m =>
            m.title.toLowerCase().includes(filter) ||
            m.body.toLowerCase().includes(filter) ||
            m.from.toLowerCase().includes(filter)
        );
        if (filtered.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'inbox-empty-message';
            emptyMsg.textContent = 'No messages.';
            messagesList.appendChild(emptyMsg);
            if (chatBox) chatBox.style.display = 'none';
        } else {
            filtered.forEach(msg => {
                const li = document.createElement('li');
                li.className = 'inbox-message-item' + (msg.unread ? ' unread' : '');
                li.dataset.thread = msg.id;
                li.innerHTML = `
                    <div class="inbox-message-meta">
                        <span class="inbox-message-from">${msg.from}</span>
                        <span class="inbox-message-date">${msg.date}</span>
                        <span class="inbox-message-status">${msg.unread ? 'Unread' : ''}</span>
                    </div>
                    <div class="inbox-message-title">${msg.title}</div>
                    <div class="inbox-message-body">${msg.body}</div>
                `;
                li.addEventListener('click', function() {
                    document.querySelectorAll('.inbox-message-item').forEach(m => m.classList.remove('selected'));
                    li.classList.add('selected');
                    msg.unread = false;
                    renderMessages(searchInput.value.toLowerCase());
                    if (chatBox) chatBox.style.display = '';
                    renderChatThread(msg);
                });
                messagesList.appendChild(li);
            });
        }
    }

    function renderNotifications(filter = '') {
        notificationsList.innerHTML = '';
        let filtered = notifications.filter(n =>
            n.title.toLowerCase().includes(filter) ||
            n.desc.toLowerCase().includes(filter)
        );
        // Hide or show the 'Mark all as read' button
        const markAllNotificationsReadBtn = document.getElementById('markAllNotificationsReadBtn');
        if (markAllNotificationsReadBtn) {
            markAllNotificationsReadBtn.style.display = filtered.length > 0 ? '' : 'none';
        }
        if (filtered.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'inbox-empty-message';
            emptyMsg.textContent = 'No notifications.';
            notificationsList.appendChild(emptyMsg);
        } else {
            filtered.forEach(notif => {
                const li = document.createElement('li');
                li.className = 'inbox-feed-item' + (notif.unread ? ' unread' : '');
                li.innerHTML = `
                    <span class="inbox-feed-icon" style="background:url('../img/notification-icon.svg') no-repeat center/contain;"></span>
                    <div class="inbox-feed-content">
                        <div class="inbox-feed-title">${notif.title}</div>
                        <div class="inbox-feed-desc">${notif.desc}</div>
                        <div class="inbox-feed-date">${notif.date}</div>
                    </div>
                `;
                li.addEventListener('click', function() {
                    // Remove from notifications array
                    const index = notifications.findIndex(n => n.id === notif.id);
                    if (index !== -1) {
                        notifications.splice(index, 1);
                        renderNotifications(filter);
                    }
                });
                notificationsList.appendChild(li);
            });
        }
    }

    function renderActivity(filter = '') {
        activityList.innerHTML = '';
        let filtered = activity.filter(a =>
            a.title.toLowerCase().includes(filter) ||
            a.desc.toLowerCase().includes(filter)
        );
        // Hide or show the 'Mark all as read' button
        const markAllActivityReadBtn = document.getElementById('markAllActivityReadBtn');
        if (markAllActivityReadBtn) {
            markAllActivityReadBtn.style.display = filtered.length > 0 ? '' : 'none';
        }
        if (filtered.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'inbox-empty-message';
            emptyMsg.textContent = 'No activity.';
            activityList.appendChild(emptyMsg);
        } else {
            filtered.forEach((act, idx) => {
                const li = document.createElement('li');
                li.className = 'inbox-feed-item' + (act.unread ? ' unread' : '');
                li.innerHTML = `
                    <span class="inbox-feed-icon" style="background:url('../img/activity-icon.svg') no-repeat center/contain;"></span>
                    <div class="inbox-feed-content">
                        <div class="inbox-feed-title">${act.title}</div>
                        <div class="inbox-feed-desc">${act.desc}</div>
                        <div class="inbox-feed-date">${act.date}</div>
                        <div class="inbox-message-status">${act.unread ? 'Unread' : ''}</div>
                    </div>
                `;
                li.addEventListener('click', function() {
                    // Remove from activity array
                    const index = activity.findIndex(a => a.id === act.id);
                    if (index !== -1) {
                        activity.splice(index, 1);
                        renderActivity(filter);
                    }
                });
                activityList.appendChild(li);
            });
        }
    }

    function renderChatThread(msg) {
        if (!msg || !msg.thread) {
            if (chatBox) chatBox.style.display = 'none';
            return;
        }
        chatThread.innerHTML = '';
        msg.thread.forEach(entry => {
            const div = document.createElement('div');
            div.className = 'inbox-chat-message' + (entry.sent ? ' sent' : '');
            div.innerHTML = `
                <div class="inbox-chat-bubble">${entry.text}</div>
                <div class="inbox-chat-meta">${entry.time}</div>
            `;
            chatThread.appendChild(div);
        });
        if (chatBox) chatBox.style.display = '';
        chatInput.value = '';
        chatInputRow.onsubmit = function(e) {
            e.preventDefault();
            if (chatInput.value.trim()) {
                msg.thread.push({sent: true, text: chatInput.value, time: new Date().toISOString().slice(0,16).replace('T',' ') });
                renderChatThread(msg);
            }
        };
        // Close chat box button
        if (closeChatBtn && chatBox) {
            closeChatBtn.addEventListener('click', function() {
                chatBox.style.display = 'none';
                document.querySelectorAll('.inbox-message-item').forEach(m => m.classList.remove('selected'));
            });
        }
    }

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            sections.forEach(sec => sec.classList.remove('active'));
            document.getElementById('section-' + tab.dataset.tab).classList.add('active');
        });
    });

    // Search
    searchInput.addEventListener('input', function() {
        const val = searchInput.value.toLowerCase();
        renderMessages(val);
        renderNotifications(val);
        renderActivity(val);
    });

    // Mark all as read (Messages)
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function() {
            messages.forEach(msg => msg.unread = false);
            renderMessages(searchInput.value.toLowerCase());
        });
    }
    // Mark all as read (Notifications)
    if (markAllNotificationsReadBtn) {
        markAllNotificationsReadBtn.addEventListener('click', function() {
            notifications = [];
            renderNotifications(searchInput.value.toLowerCase());
        });
    }
    // Mark all as read (Activity)
    if (markAllActivityReadBtn) {
        markAllActivityReadBtn.addEventListener('click', function() {
            activity = [];
            renderActivity(searchInput.value.toLowerCase());
        });
    }

    // Initial render
    renderMessages();
    renderNotifications();
    renderActivity();
});
