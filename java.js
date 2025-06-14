class SafeFilterToggle {
    constructor() {
        this.toggle = document.getElementById('safeFilterToggle');
        this.modal = document.getElementById('confirmationModal');
        this.modalMessage = document.getElementById('modalMessage');
        this.confirmBtn = document.getElementById('confirmBtn');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.pendingState = null;
        this.init();
    }

    init() {
        const savedState = localStorage.getItem('safeFilterState');
        const isOn = savedState === null ? true : savedState === 'true';
        this.updateUI(isOn);
        localStorage.setItem('safeFilterState', isOn.toString());

        this.toggle.addEventListener('click', () => this.handleToggleClick());
        this.confirmBtn.addEventListener('click', () => this.confirmAction());
        this.cancelBtn.addEventListener('click', () => this.cancelAction());

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.cancelAction();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.cancelAction();
            }
        });
    }

    handleToggleClick() {
        const currentState = this.toggle.classList.contains('active');
        this.pendingState = !currentState;
        const action = this.pendingState ? 'enable' : 'disable';
        this.modalMessage.textContent = `Are you sure you want to ${action} the Safe Filter?`;
        this.modal.style.display = 'block';
        setTimeout(() => this.confirmBtn.focus(), 100);
    }

    confirmAction() {
        if (this.pendingState !== null) {
            this.updateState(this.pendingState);
            this.pendingState = null;
        }
        this.modal.style.display = 'none';
    }

    cancelAction() {
        this.pendingState = null;
        this.modal.style.display = 'none';
    }

    updateState(isOn) {
        localStorage.setItem('safeFilterState', isOn.toString());
        this.updateUI(isOn);
    }

    updateUI(isOn) {
        this.toggle.classList.toggle('active', isOn);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SafeFilterToggle();
});
