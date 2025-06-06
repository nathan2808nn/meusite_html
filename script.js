document.addEventListener('DOMContentLoaded', function() {
    // Emojis específicos como no WhatsApp, mas com seus pedidos
    const heartEmojis = ['💍', '❤️', '🤍']; // Somente aliança, coração vermelho e branco
    
    // Função para criar os elementos flutuantes
    function createFloatingItem() {
        const item = document.createElement('div');
        const randomEmoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        item.innerHTML = randomEmoji;
        item.classList.add('floating-item');
        document.querySelector('.floating-hearts').appendChild(item);
        
        // Configurações de posição e animação
        const startPos = Math.random() * 100;
        const duration = Math.random() * 10 + 10; // Entre 10 e 20 segundos
        const size = Math.random() * 20 + 15; // Entre 15 e 35px
        const delay = Math.random() * 5; // Atraso inicial aleatório
        
        // Configurações específicas para cada tipo de emoji
        let color, shadow;
        if (randomEmoji === '💍') {
            color = '#FFD700'; // Dourado para aliança
            shadow = '0 0 5px rgba(255, 215, 0, 0.8)';
        } else if (randomEmoji === '❤️') {
            color = '#FF0000'; // Vermelho para coração
            shadow = '0 0 5px rgba(255, 0, 0, 0.5)';
        } else {
            color = '#FFFFFF'; // Branco para coração branco
            shadow = '0 0 5px rgba(255, 255, 255, 0.7)';
        }
        
        // Aplicando estilos
        item.style.left = `${startPos}vw`;
        item.style.fontSize = `${size}px`;
        item.style.color = color;
        item.style.textShadow = shadow;
        item.style.animationDuration = `${duration}s`;
        item.style.animationDelay = `${delay}s`;
        
        // Remove o elemento após a animação terminar
        setTimeout(() => {
            item.remove();
        }, (duration + delay) * 1000);
    }
    
    // Cria elementos flutuantes continuamente
    setInterval(createFloatingItem, 300);
    
    // Cria vários elementos imediatamente para preencher a tela
    for (let i = 0; i < 15; i++) {
        setTimeout(createFloatingItem, i * 200);
    }
    
    // Estilos para os elementos flutuantes
    const style = document.createElement('style');
    style.textContent = `
        .floating-item {
            position: absolute;
            pointer-events: none;
            animation: float linear infinite;
            bottom: -50px;
            opacity: 0.8;
            will-change: transform;
            z-index: 1;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.7;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translateY(-120vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .floating-hearts {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Mantendo seu efeito de digitação (opcional)
    const headerTitle = document.querySelector('.couple-names h1');
    if (headerTitle) {
        const originalText = headerTitle.textContent;
        
        function typeWriter(text, i, fnCallback) {
            if (i < text.length) {
                headerTitle.innerHTML = text.substring(0, i+1) + '<span aria-hidden="true"></span>';
                setTimeout(function() {
                    typeWriter(text, i + 1, fnCallback)
                }, 100);
            }
            else if (typeof fnCallback == 'function') {
                setTimeout(fnCallback, 700);
            }
        }
        
        function startTextAnimation() {
            headerTitle.textContent = "";
            typeWriter(originalText, 0, function(){});
        }
        
        setTimeout(startTextAnimation, 1000);
    }
});