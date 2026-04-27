// Переменные для записи аудио
let recognition;
let isRecording = false;
let currentTranscript = '';
let translations = {};

// Переводы интерфейса на разные языки
const interfaceTranslations = {
    'ru': {
        'title': 'Голосовой Переводчик',
        'input-lang': 'Язык ввода:',
        'output-langs': 'Языки перевода:',
        'record-btn': 'Начать',
        'clear-btn': 'Очистить',
        'original-text': 'Исходный текст:',
        'footer-text': 'Создано whyudontcallme | Telegram: @byecash',
        'lang-ru': 'Русский',
        'lang-en': 'Английский',
        'lang-es': 'Испанский',
        'lang-fr': 'Французский',
        'lang-de': 'Немецкий',
        'lang-it': 'Итальянский',
        'lang-pt': 'Португальский',
        'lang-ja': 'Японский',
        'lang-zh': 'Китайский',
        'lang-ko': 'Корейский',
        'lang-ar': 'Арабский',
        'lang-hi': 'Хинди',
        'lang-uk': 'Украинский',
        'lang-pl': 'Польский',
        'lang-tr': 'Турецкий',
        'lang-sv': 'Шведский'
    },
    'en': {
        'title': 'Voice Translator',
        'input-lang': 'Input Language:',
        'output-langs': 'Translation Languages:',
        'record-btn': 'Start',
        'clear-btn': 'Clear',
        'original-text': 'Original Text:',
        'footer-text': 'Created by whyudontcallme | Telegram: @byecash',
        'lang-ru': 'Russian',
        'lang-en': 'English',
        'lang-es': 'Spanish',
        'lang-fr': 'French',
        'lang-de': 'German',
        'lang-it': 'Italian',
        'lang-pt': 'Portuguese',
        'lang-ja': 'Japanese',
        'lang-zh': 'Chinese',
        'lang-ko': 'Korean',
        'lang-ar': 'Arabic',
        'lang-hi': 'Hindi',
        'lang-uk': 'Ukrainian',
        'lang-pl': 'Polish',
        'lang-tr': 'Turkish',
        'lang-sv': 'Swedish'
    },
    'es': {
        'title': 'Traductor de Voz',
        'input-lang': 'Idioma de Entrada:',
        'output-langs': 'Idiomas de Traducción:',
        'record-btn': 'Iniciar',
        'clear-btn': 'Limpiar',
        'original-text': 'Texto Original:',
        'footer-text': 'Creado por whyudontcallme | Telegram: @byecash',
        'lang-ru': 'Ruso',
        'lang-en': 'Inglés',
        'lang-es': 'Español',
        'lang-fr': 'Francés',
        'lang-de': 'Alemán',
        'lang-it': 'Italiano',
        'lang-pt': 'Portugués',
        'lang-ja': 'Japonés',
        'lang-zh': 'Chino',
        'lang-ko': 'Coreano',
        'lang-ar': 'Árabe',
        'lang-hi': 'Hindi',
        'lang-uk': 'Ucraniano',
        'lang-pl': 'Polaco',
        'lang-tr': 'Turco',
        'lang-sv': 'Sueco'
    },
    'fr': {
        'title': 'Traducteur Vocal',
        'input-lang': 'Langue d\'Entrée:',
        'output-langs': 'Langues de Traduction:',
        'record-btn': 'Démarrer',
        'clear-btn': 'Effacer',
        'original-text': 'Texte Original:',
        'footer-text': 'Créé par whyudontcallme | Telegram: @byecash',
        'lang-ru': 'Russe',
        'lang-en': 'Anglais',
        'lang-es': 'Espagnol',
        'lang-fr': 'Français',
        'lang-de': 'Allemand',
        'lang-it': 'Italien',
        'lang-pt': 'Portugais',
        'lang-ja': 'Japonais',
        'lang-zh': 'Chinois',
        'lang-ko': 'Coréen',
        'lang-ar': 'Arabe',
        'lang-hi': 'Hindi',
        'lang-uk': 'Ukrainien',
        'lang-pl': 'Polonais',
        'lang-tr': 'Turc',
        'lang-sv': 'Suédois'
    },
    'de': {
        'title': 'Sprachübersetzer',
        'input-lang': 'Eingabesprache:',
        'output-langs': 'Übersetzungssprachen:',
        'record-btn': 'Start',
        'clear-btn': 'Löschen',
        'original-text': 'Originaltext:',
        'footer-text': 'Erstellt von whyudontcallme | Telegram: @byecash',
        'lang-ru': 'Russisch',
        'lang-en': 'Englisch',
        'lang-es': 'Spanisch',
        'lang-fr': 'Französisch',
        'lang-de': 'Deutsch',
        'lang-it': 'Italienisch',
        'lang-pt': 'Portugiesisch',
        'lang-ja': 'Japanisch',
        'lang-zh': 'Chinesisch',
        'lang-ko': 'Koreanisch',
        'lang-ar': 'Arabisch',
        'lang-hi': 'Hindi',
        'lang-uk': 'Ukrainisch',
        'lang-pl': 'Polnisch',
        'lang-tr': 'Türkisch',
        'lang-sv': 'Schwedisch'
    },
    'it': {
        'title': 'Traduttore Vocale',
        'input-lang': 'Lingua di Input:',
        'output-langs': 'Lingue di Traduzione:',
        'record-btn': 'Avvia',
        'clear-btn': 'Cancella',
        'original-text': 'Testo Originale:',
        'footer-text': 'Creato da whyudontcallme | Telegram: @byecash',
        'lang-ru': 'Russo',
        'lang-en': 'Inglese',
        'lang-es': 'Spagnolo',
        'lang-fr': 'Francese',
        'lang-de': 'Tedesco',
        'lang-it': 'Italiano',
        'lang-pt': 'Portoghese',
        'lang-ja': 'Giapponese',
        'lang-zh': 'Cinese',
        'lang-ko': 'Coreano',
        'lang-ar': 'Arabo',
        'lang-hi': 'Hindi',
        'lang-uk': 'Ucraino',
        'lang-pl': 'Polacco',
        'lang-tr': 'Turco',
        'lang-sv': 'Svedese'
    },
    'pt': {
        'title': 'Tradutor de Voz',
        'input-lang': 'Idioma de Entrada:',
        'output-langs': 'Idiomas de Tradução:',
        'record-btn': 'Iniciar',
        'clear-btn': 'Limpar',
        'original-text': 'Texto Original:',
        'footer-text': 'Criado por whyudontcallme | Telegram: @byecash',
        'lang-ru': 'Russo',
        'lang-en': 'Inglês',
        'lang-es': 'Espanhol',
        'lang-fr': 'Francês',
        'lang-de': 'Alemão',
        'lang-it': 'Italiano',
        'lang-pt': 'Português',
        'lang-ja': 'Japonês',
        'lang-zh': 'Chinês',
        'lang-ko': 'Coreano',
        'lang-ar': 'Árabe',
        'lang-hi': 'Hindi',
        'lang-uk': 'Ucraniano',
        'lang-pl': 'Polonês',
        'lang-tr': 'Turco',
        'lang-sv': 'Sueco'
    },
    'ja': {
        'title': '音声翻訳機',
        'input-lang': '入力言語:',
        'output-langs': '翻訳言語:',
        'record-btn': '開始',
        'clear-btn': 'クリア',
        'original-text': '元のテキスト:',
        'footer-text': 'whyudontcallmeによって作成 | Telegram: @byecash',
        'lang-ru': 'ロシア語',
        'lang-en': '英語',
        'lang-es': 'スペイン語',
        'lang-fr': 'フランス語',
        'lang-de': 'ドイツ語',
        'lang-it': 'イタリア語',
        'lang-pt': 'ポルトガル語',
        'lang-ja': '日本語',
        'lang-zh': '中国語',
        'lang-ko': '韓国語',
        'lang-ar': 'アラビア語',
        'lang-hi': 'ヒンディー語',
        'lang-uk': 'ウクライナ語',
        'lang-pl': 'ポーランド語',
        'lang-tr': 'トルコ語',
        'lang-sv': 'スウェーデン語'
    },
    'zh': {
        'title': '语音翻译器',
        'input-lang': '输入语言:',
        'output-langs': '翻译语言:',
        'record-btn': '开始',
        'clear-btn': '清除',
        'original-text': '原始文本:',
        'footer-text': '由whyudontcallme创建 | Telegram: @byecash',
        'lang-ru': '俄语',
        'lang-en': '英语',
        'lang-es': '西班牙语',
        'lang-fr': '法语',
        'lang-de': '德语',
        'lang-it': '意大利语',
        'lang-pt': '葡萄牙语',
        'lang-ja': '日语',
        'lang-zh': '中文',
        'lang-ko': '韩语',
        'lang-ar': '阿拉伯语',
        'lang-hi': '印地语',
        'lang-uk': '乌克兰语',
        'lang-pl': '波兰语',
        'lang-tr': '土耳其语',
        'lang-sv': '瑞典语'
    },
    'ko': {
        'title': '음성 번역기',
        'input-lang': '입력 언어:',
        'output-langs': '번역 언어:',
        'record-btn': '시작',
        'clear-btn': '지우기',
        'original-text': '원본 텍스트:',
        'footer-text': 'whyudontcallme가 만듦 | Telegram: @byecash',
        'lang-ru': '러시아어',
        'lang-en': '영어',
        'lang-es': '스페인어',
        'lang-fr': '프랑스어',
        'lang-de': '독일어',
        'lang-it': '이탈리아어',
        'lang-pt': '포르투갈어',
        'lang-ja': '일본어',
        'lang-zh': '중국어',
        'lang-ko': '한국어',
        'lang-ar': '아랍어',
        'lang-hi': '힌디어',
        'lang-uk': '우크라이나어',
        'lang-pl': '폴란드어',
        'lang-tr': '터키어',
        'lang-sv': '스웨덴어'
    },
    'uk': {
        'title': 'Голосовий Перекладач',
        'input-lang': 'Мова введення:',
        'output-langs': 'Мови перекладу:',
        'record-btn': 'Почати',
        'clear-btn': 'Очистити',
        'original-text': 'Вихідний текст:',
        'footer-text': 'Створено whyudontcallme | Telegram: @byecash',
        'lang-ru': 'Російська',
        'lang-en': 'Англійська',
        'lang-es': 'Іспанська',
        'lang-fr': 'Французька',
        'lang-de': 'Німецька',
        'lang-it': 'Італійська',
        'lang-pt': 'Португальська',
        'lang-ja': 'Японська',
        'lang-zh': 'Китайська',
        'lang-ko': 'Корейська',
        'lang-ar': 'Арабська',
        'lang-hi': 'Гінді',
        'lang-uk': 'Українська',
        'lang-pl': 'Польська',
        'lang-tr': 'Турецька',
        'lang-sv': 'Шведька'
    },
    'pl': {
        'title': 'Tłumacz Głosu',
        'input-lang': 'Język Wejścia:',
        'output-langs': 'Języki Tłumaczenia:',
        'record-btn': 'Rozpocznij',
        'clear-btn': 'Wyczyść',
        'original-text': 'Tekst Oryginalny:',
        'footer-text': 'Utworzone przez whyudontcallme | Telegram: @byecash',
        'lang-ru': 'Rosyjski',
        'lang-en': 'Angielski',
        'lang-es': 'Hiszpański',
        'lang-fr': 'Francuski',
        'lang-de': 'Niemiecki',
        'lang-it': 'Włoski',
        'lang-pt': 'Portugalski',
        'lang-ja': 'Japoński',
        'lang-zh': 'Chiński',
        'lang-ko': 'Koreański',
        'lang-ar': 'Arabski',
        'lang-hi': 'Hindi',
        'lang-uk': 'Ukraiński',
        'lang-pl': 'Polski',
        'lang-tr': 'Turecki',
        'lang-sv': 'Szwedzki'
    },
    'tr': {
        'title': 'Sesli Çevirmen',
        'input-lang': 'Giriş Dili:',
        'output-langs': 'Çeviri Dilleri:',
        'record-btn': 'Başlat',
        'clear-btn': 'Temizle',
        'original-text': 'Orijinal Metin:',
        'footer-text': 'whyudontcallme tarafından oluşturuldu | Telegram: @byecash',
        'lang-ru': 'Rusça',
        'lang-en': 'İngilizce',
        'lang-es': 'İspanyolca',
        'lang-fr': 'Fransızca',
        'lang-de': 'Almanca',
        'lang-it': 'İtalyanca',
        'lang-pt': 'Portekizce',
        'lang-ja': 'Japonca',
        'lang-zh': 'Çince',
        'lang-ko': 'Korece',
        'lang-ar': 'Arapça',
        'lang-hi': 'Hintçe',
        'lang-uk': 'Ukraynaca',
        'lang-pl': 'Lehçe',
        'lang-tr': 'Türkçe',
        'lang-sv': 'İsveçce'
    },
    'sv': {
        'title': 'Röstöversättare',
        'input-lang': 'Indataspråk:',
        'output-langs': 'Översättningsspråk:',
        'record-btn': 'Starta',
        'clear-btn': 'Rensa',
        'original-text': 'Originaltext:',
        'footer-text': 'Skapat av whyudontcallme | Telegram: @byecash',
        'lang-ru': 'Ryska',
        'lang-en': 'Engelska',
        'lang-es': 'Spanska',
        'lang-fr': 'Franska',
        'lang-de': 'Tyska',
        'lang-it': 'Italienska',
        'lang-pt': 'Portugisiska',
        'lang-ja': 'Japanska',
        'lang-zh': 'Kinesiska',
        'lang-ko': 'Koreanska',
        'lang-ar': 'Arabiska',
        'lang-hi': 'Hindi',
        'lang-uk': 'Ukrainska',
        'lang-pl': 'Polska',
        'lang-tr': 'Turkiska',
        'lang-sv': 'Svenska'
    }
};

// Соответствие кодов языков для API
const languageMap = {
    'ru': 'ru',
    'en': 'en',
    'es': 'es',
    'fr': 'fr',
    'de': 'de',
    'it': 'it',
    'pt': 'pt',
    'ja': 'ja',
    'zh': 'zh-CN',
    'ko': 'ko',
    'ar': 'ar',
    'hi': 'hi',
    'uk': 'uk',
    'pl': 'pl',
    'tr': 'tr',
    'sv': 'sv'
};

// Названия языков
const languageNames = {
    'ru': 'Русский',
    'en': 'Английский',
    'es': 'Испанский',
    'fr': 'Французский',
    'de': 'Немецкий',
    'it': 'Итальянский',
    'pt': 'Португальский',
    'ja': 'Японский',
    'zh': 'Китайский',
    'ko': 'Корейский',
    'ar': 'Арабский',
    'hi': 'Хинди',
    'uk': 'Украинский',
    'pl': 'Польский',
    'tr': 'Турецкий',
    'sv': 'Шведский'
};

// Инициализация API распознавания речи
function initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        showStatus('Ваш браузер не поддерживает распознавание речи', 'error');
        document.getElementById('recordBtn').disabled = true;
        return;
    }

    recognition = new SpeechRecognition();
    updateInputLanguage();
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
        isRecording = true;
        document.getElementById('recordBtn').classList.add('recording');
        document.getElementById('recordBtn').textContent = 'Остановить запись';
        document.getElementById('recordingIndicator').classList.remove('hidden');
        showStatus('Слушаю...', 'loading');
    };

    recognition.onresult = (event) => {
        let transcript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcriptSegment = event.results[i][0].transcript;
            transcript += transcriptSegment;
        }

        currentTranscript = transcript;
        console.log('Recognized transcript:', transcript);
        document.getElementById('originalText').textContent = transcript;

        if (event.results[event.results.length - 1].isFinal) {
            console.log('Final result received, starting translation...');
            showStatus('Переводу...', 'loading');
            translateToMultipleLanguages(transcript);
        }
    };

    recognition.onerror = (event) => {
        let errorMessage = 'Ошибка при записи';
        
        switch(event.error) {
            case 'network':
                errorMessage = 'Ошибка сети. Проверьте интернет-соединение.';
                break;
            case 'no-speech':
                errorMessage = 'Я не услышал речь. Попробуйте снова.';
                break;
            case 'audio-capture':
                errorMessage = 'Микрофон не найден. Проверьте разрешения.';
                break;
        }
        
        showStatus(errorMessage, 'error');
    };

    recognition.onend = () => {
        isRecording = false;
        document.getElementById('recordBtn').classList.remove('recording');
        document.getElementById('recordBtn').textContent = 'Начать';
        document.getElementById('recordingIndicator').classList.add('hidden');
    };
}

// Функция для изменения языка ввода
function updateInputLanguage() {
    const selectedLang = document.getElementById('inputLanguage').value;
    console.log('Selected input language:', selectedLang);
    
    if (recognition) {
        recognition.lang = selectedLang;
        console.log('Recognition language set to:', selectedLang);
    }
    
    // Меняем язык интерфейса
    changeInterfaceLanguage(selectedLang.split('-')[0]);
}

// Функция для смены языка интерфейса
function changeInterfaceLanguage(langCode) {
    const translations = interfaceTranslations[langCode];
    
    if (!translations) {
        return; // Если перевода нет, используем русский
    }
    
    // Обновляем все элементы с data-i18n атрибутом
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        if (translations[key]) {
            // Если это кнопка и уже идет запись, не меняем текст
            if (element.id === 'recordBtn' && isRecording) {
                return;
            }
            element.textContent = translations[key];
        }
    });
    
    // Обновляем footer
    const footer = document.querySelector('.footer p');
    if (footer && translations['footer-text']) {
        footer.innerHTML = translations['footer-text'].replace('Telegram: @byecash', '<a href="https://t.me/byecash" target="_blank">Telegram: @byecash</a>');
    }
}

// Получение языка ввода в формате для API
function getSourceLanguageCode() {
    const fullLang = document.getElementById('inputLanguage').value;
    const langCode = fullLang.split('-')[0];
    return langCode;
}

// Функция перевода на несколько языков
async function translateToMultipleLanguages(text) {
    const selectedLanguages = getSelectedLanguages();
    
    console.log('Selected languages:', selectedLanguages);
    console.log('Text to translate:', text);
    
    if (selectedLanguages.length === 0) {
        showStatus('Выберите хотя бы один язык для перевода', 'error');
        return;
    }

    translations = {};
    const container = document.getElementById('translationsContainer');
    container.innerHTML = '';

    showStatus('Переводу на ' + selectedLanguages.length + ' языков...', 'loading');

    const sourceLang = getSourceLanguageCode();
    console.log('Source language:', sourceLang);
    let completedCount = 0;
    
    for (const langCode of selectedLanguages) {
        // Не переводить на тот же язык
        if (langCode === sourceLang) {
            addTranslationItem(langCode, text, true);
            completedCount++;
            continue;
        }

        try {
            let translatedText = null;
            
            // Попытка 1: MyMemory API с повторами
            for (let attempt = 0; attempt < 3; attempt++) {
                translatedText = await translateWithMyMemory(text, sourceLang, langCode);
                if (translatedText) break;
                await new Promise(r => setTimeout(r, 500)); // Ждём 500ms перед повтором
            }
            
            // Попытка 2: Альтернативный способ через MyMemory
            if (!translatedText) {
                translatedText = await translateWithMyMemoryAlt(text, sourceLang, langCode);
            }
            
            // Попытка 3: Google Translate
            if (!translatedText) {
                translatedText = await translateWithGoogle(text, sourceLang, langCode);
            }
            
            console.log(`Translation to ${langCode}:`, translatedText);
            
            if (translatedText) {
                translations[langCode] = translatedText;
                addTranslationItem(langCode, translatedText, false);
                completedCount++;
            } else {
                console.error(`Failed to translate to ${langCode}`);
                addTranslationItemError(langCode);
            }
        } catch (error) {
            console.error('Ошибка перевода на ' + langCode + ':', error);
            addTranslationItemError(langCode);
        }
    }

    if (completedCount > 0) {
        showStatus('✓ Перевод завершен', 'success');
    } else {
        showStatus('Ошибка при переводе. Проверьте интернет-соединение.', 'error');
    }
}

// Перевод через Google Translate (самый точный способ)
async function translateWithMyMemory(text, sourceLang, targetLang) {
    try {
        // Преобразуем коды языков для API
        const sourceCode = languageMap[sourceLang] || sourceLang;
        const targetCode = languageMap[targetLang] || targetLang;
        
        console.log(`Google Translate: ${sourceCode} -> ${targetCode}`);
        
        // Используем Google Translate API через proxy
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceCode}&tl=${targetCode}&dt=t&q=${encodeURIComponent(text)}`;
        
        const response = await fetch(url, {
            signal: AbortSignal.timeout(15000),
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) {
            console.log('Google Translate response not ok:', response.status);
            return null;
        }
        
        const data = await response.json();
        console.log('Google Translate response:', data);
        
        // Google Translate возвращает массив с переводом в первом элементе
        if (data && Array.isArray(data) && data[0] && Array.isArray(data[0])) {
            let translatedText = '';
            for (let i = 0; i < data[0].length; i++) {
                if (data[0][i][0]) {
                    translatedText += data[0][i][0];
                }
            }
            if (translatedText) {
                return translatedText;
            }
        }
        
        return null;
    } catch (error) {
        console.error('Google Translate error:', error.message);
        return null;
    }
}

// Альтернативный способ - Bing Translator
async function translateWithMyMemoryAlt(text, sourceLang, targetLang) {
    try {
        // Bing Translator имеет хороший API
        const response = await fetch('https://www.bing.com/translator/api/language/translate', {
            method: 'POST',
            signal: AbortSignal.timeout(15000),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            body: `text=${encodeURIComponent(text)}&from=${sourceLang}&to=${targetLang}`
        }).catch(() => null);

        if (!response || !response.ok) {
            // Fallback на Google через другой endpoint
            const googleUrl = `https://translate.googleapis.com/translate_a/element.js?cb=googleTranslateElementInit&client=gtx`;
            console.log('Trying alternative Google endpoint...');
            return null;
        }
        
        const data = await response.json().catch(() => null);
        if (data && data.translationResult) {
            return data.translationResult;
        }
        
        return null;
    } catch (error) {
        console.error('Bing Translate error:', error.message);
        return null;
    }
}

// Перевод через резервный способ
async function translateWithGoogle(text, sourceLang, targetLang) {
    try {
        // Преобразуем коды языков для MyMemory API
        const sourceCode = languageMap[sourceLang] || sourceLang;
        const targetCode = languageMap[targetLang] || targetLang;
        
        // MyMemory как последний fallback для точности
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceCode}|${targetCode}`;
        console.log('Using MyMemory fallback:', url);
        
        const response = await fetch(url, {
            signal: AbortSignal.timeout(15000),
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        console.log('Fallback response status:', response.status);
        
        if (!response.ok) {
            return null;
        }
        
        const data = await response.json();
        console.log('MyMemory fallback response:', data);
        
        if (data.responseStatus === 200 && data.responseData && data.responseData.translatedText) {
            return data.responseData.translatedText;
        }
        
        return null;
    } catch (error) {
        console.error('Final fallback error:', error.message);
        return null;
    }
}

// Получение выбранных языков
function getSelectedLanguages() {
    const checkboxes = document.querySelectorAll('.checkbox-label input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// Добавление элемента перевода в контейнер
function addTranslationItem(langCode, translatedText, isOriginal = false) {
    const container = document.getElementById('translationsContainer');
    
    const item = document.createElement('div');
    item.className = 'translation-item';
    item.dataset.lang = langCode;
    
    let label = languageNames[langCode];
    if (isOriginal) {
        label += ' (исходный язык)';
    }
    
    item.innerHTML = `
        <h4>${label}</h4>
        <div class="text-box">
            <div class="translation-text">${escapeHtml(translatedText)}</div>
            <div class="translation-actions">
                <button class="translation-btn speak-btn" title="Произнести">🔊</button>
                <button class="translation-btn copy-btn" title="Копировать">📋</button>
            </div>
        </div>
    `;
    
    container.appendChild(item);
    
    // Добавляем обработчики событий
    item.querySelector('.speak-btn').addEventListener('click', () => {
        speakTranslation(langCode, translatedText);
    });
    
    item.querySelector('.copy-btn').addEventListener('click', () => {
        copyToClipboard(translatedText);
    });
}

// Добавление элемента с ошибкой
function addTranslationItemError(langCode) {
    const container = document.getElementById('translationsContainer');
    
    const item = document.createElement('div');
    item.className = 'translation-item';
    item.dataset.lang = langCode;
    
    item.innerHTML = `
        <h4>${languageNames[langCode]}</h4>
        <div class="text-box error-box">
            <div class="translation-text">Ошибка при переводе</div>
        </div>
    `;
    
    container.appendChild(item);
}

// Экранирование HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Функция произнесения перевода
function speakTranslation(langCode, text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getFullLanguageCode(langCode);
    utterance.rate = 0.9;
    
    window.speechSynthesis.speak(utterance);
    showStatus('Воспроизведение...', 'loading');
}

// Получение полного кода языка для синтеза речи
function getFullLanguageCode(langCode) {
    const langMap = {
        'ru': 'ru-RU',
        'en': 'en-US',
        'es': 'es-ES',
        'fr': 'fr-FR',
        'de': 'de-DE',
        'it': 'it-IT',
        'pt': 'pt-PT',
        'ja': 'ja-JP',
        'zh': 'zh-CN',
        'ko': 'ko-KR',
        'ar': 'ar-SA',
        'hi': 'hi-IN',
        'uk': 'uk-UA',
        'pl': 'pl-PL',
        'tr': 'tr-TR',
        'sv': 'sv-SE'
    };
    return langMap[langCode] || 'en-US';
}

// Функция копирования в буфер обмена
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showStatus('✓ Скопировано', 'success');
    }).catch(() => {
        showStatus('Ошибка при копировании', 'error');
    });
}

// Функция вывода сообщений о статусе
function showStatus(message, type = '') {
    const statusEl = document.getElementById('status');
    statusEl.textContent = message;
    statusEl.className = 'status';
    
    if (type) {
        statusEl.classList.add(type);
    }
    
    // Удаляем статус через 5 секунд
    if (type === 'success' || type === 'error') {
        setTimeout(() => {
            statusEl.textContent = '';
            statusEl.className = 'status';
        }, 5000);
    }
}

// Функция очистки
function clearAll() {
    currentTranscript = '';
    translations = {};
    document.getElementById('originalText').textContent = '—';
    document.getElementById('translationsContainer').innerHTML = '';
    document.getElementById('status').textContent = '';
    document.getElementById('status').className = 'status';
}

// Обработчик кнопки записи
document.getElementById('recordBtn').addEventListener('click', () => {
    try {
        if (isRecording) {
            console.log('Остановка записи...');
            recognition.abort();
            isRecording = false;
            document.getElementById('recordBtn').classList.remove('recording');
            document.getElementById('recordBtn').textContent = 'Начать';
            document.getElementById('recordingIndicator').classList.add('hidden');
            showStatus('Запись остановлена', 'success');
        } else {
            // Проверяем, выбран ли хотя бы один язык
            const selectedLanguages = getSelectedLanguages();
            if (selectedLanguages.length === 0) {
                showStatus('⚠️ Выберите хотя бы один язык для перевода', 'error');
                return;
            }
            
            console.log('Начало записи...');
            const inputLang = document.getElementById('inputLanguage').value;
            console.log('Recording in language:', inputLang);
            clearAll();
            recognition.start();
        }
    } catch (error) {
        console.error('Ошибка при работе с микрофоном:', error);
        showStatus('Ошибка при работе с микрофоном', 'error');
    }
});

// Обработчик для изменения языка ввода
document.getElementById('inputLanguage').addEventListener('change', updateInputLanguage);

// Обработчик кнопки очистки
document.getElementById('clearBtn').addEventListener('click', clearAll);

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initRecognition();
});
