/* ==========================================================================
   1. Modal Controls (Login/Register Popup Open aur Close karne ke liye)
   ========================================================================== */
function openModal() {
    document.getElementById('authModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('authModal').style.display = 'none';
}

// Agar user popup box ke bahar kahi click kare, toh popup apne aap band ho jaye
window.onclick = function(event) {
    const modal = document.getElementById('authModal');
    if (event.target === modal) {
        closeModal();
    }
}

/* ==========================================================================
   2. Tab Switching Logic (Sign In aur Register Forms ke beech switch karne ke liye)
   ========================================================================== */
function switchTab(type) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');

    if (type === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
    }
}

/* ==========================================================================
   3. Mock Authentication Logic (LocalStorage ka use karke User Data Handle karna)
   ========================================================================== */
function handleAuth(event, type) {
    event.preventDefault(); // Form ko automatic reload hone se rokne ke liye

    if (type === 'register') {
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPass').value;

        // Browser ki memory (LocalStorage) me user ki details save karna
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
        localStorage.setItem('userName', name);

        alert('Registration Successful! Ab aap Sign In kar sakte hain.');
        
        // Register hone ke baad automatic Login tab par bhej dena
        switchTab('login');
    } 
    
    if (type === 'login') {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPass').value;

        // LocalStorage se save kiya hua data wapas nikalna
        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');
        const storedName = localStorage.getItem('userName');

        // Validation Check
        if (email === storedEmail && password === storedPassword) {
            alert(`Welcome back, ${storedName}!`);
            
            // Navbar ke "Login / Register" button ko badalkar user ka naam dikhana
            document.getElementById('authBtn').innerText = `Hi, ${storedName}`;
            
            // Popup ko band karna
            closeModal();
        } else {
            alert('Galat Email ya Password! Kripya sahi details daalein ya naya account banayein.');
        }
    }
}

/* ==========================================================================
   4. Page Load Check (Agar user pehle se logged in hai toh check karna)
   ========================================================================== */
window.onload = function() {
    const storedName = localStorage.getItem('userName');
    // Agar local storage me pehle se naam saved hai, toh user ko logged in dikhana
    if (storedName) {
        document.getElementById('authBtn').innerText = `Hi, ${storedName}`;
    }
}
