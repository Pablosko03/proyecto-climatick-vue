<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        closePopup() {
            this.$emit('close');
            this.updateUI();
        },

        updateUI() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            document.getElementById('LogIn').style.display = isLoggedIn ? 'none' : 'inline-block';
            document.getElementById('Registro').style.display = isLoggedIn ? 'none' : 'inline-block';
            document.getElementById('LogOut').style.display = isLoggedIn ? 'inline-block' : 'none';
            window.onload = this.updateUI;
        },
    }
}
</script>

<template>
    <div class="modal-overlay" :class="{ 'active': show }" id="modalOverlay">
        <div class="modal-content" id="modalContent">
            <div class="modal-header">
                <h2 class="modal-title">¡Bienvenido a Climatik!</h2>
                <button @click="closePopup()" class="close-btn" id="closeModal">&times;</button>
            </div>

            <div class="modal-body">
                <p>¿Quieres saber si hoy toca sol, lluvia o sacar el abrigo? Escribe el nombre de tu ciudad o pueblo y
                    te contamos el tiempo de hoy y de los próximos 5 días. ¡Así de fácil, sin complicaciones!</p>
            </div>
        </div>
    </div>

</template>

<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
}

.modal-overlay.active {
    opacity: 1;
    visibility: visible;
}

/* Modal Content */
.modal-content {
    background: white;
    border-radius: 12px;
    padding: 0;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    transform: scale(0.8) translateY(50px);
    transition: all 0.3s ease;
}

.modal-overlay.active .modal-content {
    transform: scale(1) translateY(0);
}

.modal-header {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    padding: 20px 30px;
    position: relative;
}

.modal-title {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
}

.close-btn {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: white;
    font-size: 28px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-50%) rotate(90deg);
}

.modal-body {
    padding: 30px;
}

.modal-body p {
    margin-bottom: 20px;
    color: #555;
    line-height: 1.8;
}

.modal-body .highlight {
    background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%);
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #667eea;
    margin: 20px 0;
}

.modal-footer {
    padding: 20px 30px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    gap: 15px;
}

.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-secondary {
    background: #f8f9fa;
    color: #6c757d;
    border: 1px solid #dee2e6;
}

.btn-secondary:hover {
    background: #e9ecef;
}

.btn-primary {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

/* Animaciones adicionales */
@keyframes modalFadeIn {
    from {
        opacity: 0;
        transform: scale(0.8) translateY(50px);
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.modal-content.animate {
    animation: modalFadeIn 0.4s ease-out;
}

/* Responsive */
@media (max-width: 768px) {
    .modal-content {
        width: 95%;
        margin: 20px;
    }

    .modal-header,
    .modal-body,
    .modal-footer {
        padding: 20px;
    }

    .modal-footer {
        flex-direction: column;
    }

    .btn {
        width: 100%;
    }
}
</style>