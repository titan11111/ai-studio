<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>世界の港を巡る船旅</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Hiragino Sans', 'Yu Gothic', sans-serif;
            overflow: hidden;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(to bottom, #87CEEB 0%, #4A90E2 100%);
            position: relative;
        }

        #gameContainer {
            width: 100%;
            height: 100%;
            position: relative;
            cursor: pointer;
        }

        #sky {
            width: 100%;
            height: 40%;
            position: absolute;
            top: 0;
            background: linear-gradient(to bottom, #87CEEB 0%, #B0E0E6 100%);
            overflow: hidden;
        }

        .cloud {
            position: absolute;
            background: white;
            border-radius: 100px;
            opacity: 0.8;
            animation: floatCloud 30s linear infinite;
        }

        @keyframes floatCloud {
            from { transform: translateX(-200px); }
            to { transform: translateX(calc(100vw + 200px)); }
        }

        #sea {
            width: 100%;
            height: 60%;
            position: absolute;
            bottom: 0;
            background: linear-gradient(to bottom, #4A90E2 0%, #1E3A8A 100%);
            overflow: hidden;
        }

        .wave {
            position: absolute;
            width: 200%;
            height: 100px;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100"><path d="M0,50 Q300,20 600,50 T1200,50 L1200,100 L0,100 Z" fill="%235BA3E0" opacity="0.3"/></svg>');
            background-size: 50% 100%;
            animation: waveMove 15s linear infinite;
        }

        @keyframes waveMove {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
        }

        #ship {
            position: absolute;
            width: 120px;
            height: 80px;
            left: 50%;
            bottom: 25%;
            transform: translateX(-50%);
            animation: bobbing 3s ease-in-out infinite;
            z-index: 10;
        }

        @keyframes bobbing {
            0%, 100% { transform: translateX(-50%) translateY(0) rotate(0deg); }
            25% { transform: translateX(-50%) translateY(-10px) rotate(-2deg); }
            75% { transform: translateX(-50%) translateY(10px) rotate(2deg); }
        }

        #cityInfo {
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.95);
            padding: 20px 30px;
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 90%;
            z-index: 20;
        }

        #cityName {
            font-size: clamp(24px, 5vw, 36px);
            font-weight: bold;
            color: #1E3A8A;
            margin-bottom: 10px;
        }

        #cityDescription {
            font-size: clamp(14px, 3vw, 18px);
            color: #333;
            line-height: 1.6;
        }

        #progress {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.9);
            padding: 15px 25px;
            border-radius: 30px;
            font-size: clamp(16px, 3.5vw, 20px);
            font-weight: bold;
            color: #1E3A8A;
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
            z-index: 20;
        }

        #instruction {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            font-size: clamp(16px, 3.5vw, 22px);
            color: #333;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            animation: pulse 2s ease-in-out infinite;
            z-index: 30;
        }

        @keyframes pulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.05); }
        }

        #congratulations {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.98);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            z-index: 40;
            display: none;
        }

        #congratulations h2 {
            font-size: clamp(24px, 5vw, 36px);
            color: #1E3A8A;
            margin-bottom: 20px;
        }

        #congratulations p {
            font-size: clamp(16px, 3.5vw, 20px);
            color: #333;
            margin-bottom: 10px;
        }

        #restartButton {
            margin-top: 20px;
            padding: 15px 30px;
            font-size: clamp(16px, 3.5vw, 20px);
            background: #1E3A8A;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-weight: bold;
        }

        #restartButton:hover {
            background: #2E4A9A;
        }

        .building {
            position: absolute;
            bottom: 60%;
            z-index: 5;
            opacity: 0;
            animation: fadeInBuilding 1s ease-in forwards;
        }

        @keyframes fadeInBuilding {
            to { opacity: 1; }
        }
    </style>
</head>
<body>
    <div id="gameContainer">
        <div id="sky"></div>
        <div id="sea">
            <div class="wave" style="bottom: 0;"></div>
            <div class="wave" style="bottom: 30px; animation-delay: -5s;"></div>
            <div class="wave" style="bottom: 60px; animation-delay: -10s;"></div>
        </div>
        
        <svg id="ship" viewBox="0 0 120 80">
            <polygon points="60,20 90,60 30,60" fill="#8B4513"/>
            <rect x="50" y="30" width="20" height="30" fill="#A0522D"/>
            <polygon points="20,60 100,60 110,75 10,75" fill="#654321"/>
            <circle cx="40" cy="50" r="3" fill="#FFD700"/>
            <circle cx="60" cy="50" r="3" fill="#FFD700"/>
            <circle cx="80" cy="50" r="3" fill="#FFD700"/>
        </svg>

        <div id="buildings"></div>

        <div id="cityInfo">
            <div id="cityName"></div>
            <div id="cityDescription"></div>
        </div>

        <div id="progress"></div>
        <div id="instruction">画面をタップして<br>船旅を始めよう！⛵</div>

        <div id="congratulations">
            <h2>🎉 おめでとうございます！ 🎉</h2>
            <p>世界10都市の船旅を完走しました！</p>
            <p>素晴らしい冒険でしたね✨</p>
            <button id="restartButton">もう一度旅する</button>
        </div>
    </div>

    <script>
        const cities = [
            {
                name: "リオデジャネイロ",
                country: "ブラジル",
                description: "カーニバルと美しいビーチで有名な南米の宝石",
                color: "#FFD700"
            },
            {
                name: "ケープタウン",
                country: "南アフリカ",
                description: "テーブルマウンテンと二つの海が出会う港町",
                color: "#FF6B6B"
            },
            {
                name: "イスタンブール",
                country: "トルコ",
                description: "ヨーロッパとアジアをつなぐ歴史的な港",
                color: "#4ECDC4"
            },
            {
                name: "バンクーバー",
                country: "カナダ",
                description: "山と海に囲まれた自然豊かな美しい港",
                color: "#95E1D3"
            },
            {
                name: "ドバイ",
                country: "アラブ首長国連邦",
                description: "砂漠に輝く未来都市、世界一の高層ビル群",
                color: "#F38181"
            },
            {
                name: "バルセロナ",
                country: "スペイン",
                description: "ガウディ建築と地中海の風が薫る芸術の街",
                color: "#AA96DA"
            },
            {
                name: "メルボルン",
                country: "オーストラリア",
                description: "カフェ文化とアートが溢れる南半球の港",
                color: "#FCBAD3"
            },
            {
                name: "ムンバイ",
                country: "インド",
                description: "ボリウッドと活気溢れるインドの玄関口",
                color: "#FFFFD2"
            },
            {
                name: "リスボン",
                country: "ポルトガル",
                description: "大航海時代の面影残す黄色い路面電車の街",
                color: "#A8D8EA"
            },
            {
                name: "ホーチミン",
                country: "ベトナム",
                description: "バイクとフォーが行き交う活気あるメコンの港",
                color: "#FFB6B9"
            }
        ];

        let currentCity = 0;
        let gameStarted = false;
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        function playWhistle() {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }

        function playWaveSound() {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(80, audioContext.currentTime + 1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
        }

        function createClouds() {
            const sky = document.getElementById('sky');
            for (let i = 0; i < 5; i++) {
                const cloud = document.createElement('div');
                cloud.className = 'cloud';
                cloud.style.width = `${80 + Math.random() * 100}px`;
                cloud.style.height = `${30 + Math.random() * 40}px`;
                cloud.style.top = `${Math.random() * 60}%`;
                cloud.style.left = `${Math.random() * 100}%`;
                cloud.style.animationDelay = `${-Math.random() * 30}s`;
                cloud.style.animationDuration = `${20 + Math.random() * 20}s`;
                sky.appendChild(cloud);
            }
        }

        function createBuildings(color) {
            const buildingsContainer = document.getElementById('buildings');
            buildingsContainer.innerHTML = '';
            
            const buildingCount = 5;
            for (let i = 0; i < buildingCount; i++) {
                const building = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                building.setAttribute('class', 'building');
                building.setAttribute('width', '60');
                building.setAttribute('height', '100');
                building.style.left = `${10 + i * 18}%`;
                
                const height = 60 + Math.random() * 40;
                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('x', '10');
                rect.setAttribute('y', `${100 - height}`);
                rect.setAttribute('width', '40');
                rect.setAttribute('height', `${height}`);
                rect.setAttribute('fill', color);
                rect.setAttribute('opacity', '0.8');
                
                building.appendChild(rect);
                
                for (let j = 0; j < 3; j++) {
                    for (let k = 0; k < 2; k++) {
                        const window = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                        window.setAttribute('x', `${15 + k * 15}`);
                        window.setAttribute('y', `${100 - height + 10 + j * 15}`);
                        window.setAttribute('width', '8');
                        window.setAttribute('height', '10');
                        window.setAttribute('fill', '#FFD700');
                        building.appendChild(window);
                    }
                }
                
                buildingsContainer.appendChild(building);
            }
        }

        function updateCity() {
            const city = cities[currentCity];
            document.getElementById('cityName').textContent = `${city.name}（${city.country}）`;
            document.getElementById('cityDescription').textContent = city.description;
            document.getElementById('progress').textContent = `${currentCity + 1} / ${cities.length} 都市目`;
            
            createBuildings(city.color);
            playWhistle();
            playWaveSound();
        }

        function startGame() {
            if (!gameStarted) {
                gameStarted = true;
                document.getElementById('instruction').style.display = 'none';
                updateCity();
            } else if (currentCity < cities.length - 1) {
                currentCity++;
                updateCity();
            } else {
                document.getElementById('congratulations').style.display = 'block';
            }
        }

        document.getElementById('gameContainer').addEventListener('click', startGame);
        document.getElementById('gameContainer').addEventListener('touchstart', function(e) {
            e.preventDefault();
            startGame();
        }, { passive: false });

        document.getElementById('restartButton').addEventListener('click', function(e) {
            e.stopPropagation();
            currentCity = 0;
            gameStarted = false;
            document.getElementById('congratulations').style.display = 'none';
            document.getElementById('instruction').style.display = 'block';
            document.getElementById('cityInfo').style.display = 'block';
        });

        createClouds();
        setInterval(playWaveSound, 5000);
    </script>
</body>
</html>