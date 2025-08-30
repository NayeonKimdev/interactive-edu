// Interactive Education App
class InteractiveEduApp {
    constructor() {
        this.currentPage = 'home';
        this.currentQuiz = 0;
        this.currentCard = 0;
        this.score = 0;
        this.quizAnswers = [];
        this.studyStats = this.loadStudyStats();
        
        this.quizData = [
            {
                question: "JavaScript에서 변수를 선언하는 키워드는?",
                options: ["var", "let", "const", "모두 정답"],
                correct: 3,
                explanation: "JavaScript에서는 var, let, const 모두 변수 선언에 사용됩니다."
            },
            {
                question: "HTML의 정식 명칭은?",
                options: ["Hyperlink Text Markup Language", "HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language"],
                correct: 1,
                explanation: "HTML은 HyperText Markup Language의 줄임말입니다."
            },
            {
                question: "CSS에서 요소를 중앙 정렬하는 속성은?",
                options: ["text-align: center", "margin: 0 auto", "justify-content: center", "모든 방법이 가능"],
                correct: 3,
                explanation: "상황에 따라 다양한 방법으로 중앙 정렬이 가능합니다."
            },
            {
                question: "반응형 웹 디자인에서 주로 사용하는 단위는?",
                options: ["px", "em", "rem", "%와 vw/vh"],
                correct: 3,
                explanation: "반응형 디자인에서는 상대적 단위인 %와 뷰포트 단위를 주로 사용합니다."
            },
            {
                question: "Git에서 변경사항을 저장소에 반영하는 명령어는?",
                options: ["git add", "git commit", "git push", "git pull"],
                correct: 1,
                explanation: "git commit은 변경사항을 로컬 저장소에 기록하는 명령어입니다."
            }
        ];

        this.flashcardData = [
            {
                front: "HTML",
                back: "HyperText Markup Language\n웹 페이지의 구조를 정의하는 마크업 언어"
            },
            {
                front: "CSS",
                back: "Cascading Style Sheets\n웹 페이지의 스타일과 레이아웃을 담당하는 언어"
            },
            {
                front: "JavaScript",
                back: "동적인 웹 페이지를 만들기 위한\n클라이언트 사이드 프로그래밍 언어"
            }
        ];

        this.initializeApp();
        this.updateProgressStats();
    }

    initializeApp() {
        this.bindNavigation();
        this.bindQuizEvents();
        this.bindFlashcardEvents();
        this.bindFeatureCards();
        this.showQuiz();
        this.showFlashcard();
    }

    bindNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const pages = document.querySelectorAll('.page');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const targetPage = e.target.getAttribute('data-page');
                
                // Update active nav item
                navItems.forEach(nav => nav.classList.remove('active'));
                e.target.classList.add('active');
                
                // Show target page
                pages.forEach(page => page.classList.remove('active'));
                document.getElementById(`${targetPage}-page`).classList.add('active');
                
                this.currentPage = targetPage;
                
                // Update progress stats when viewing progress page
                if (targetPage === 'progress') {
                    this.updateProgressStats();
                }
            });
        });
    }

    bindFeatureCards() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const feature = e.currentTarget.getAttribute('data-feature');
                
                // Simulate navigation to feature
                const targetNav = document.querySelector(`[data-page="${feature}"]`);
                if (targetNav) {
                    targetNav.click();
                }
            });
        });
    }

    bindQuizEvents() {
        const options = document.querySelectorAll('.option');
        const nextBtn = document.getElementById('next-question');
        const prevBtn = document.getElementById('prev-question');
        const restartBtn = document.getElementById('restart-quiz');

        options.forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectAnswer(e.target);
            });
        });

        nextBtn.addEventListener('click', () => this.nextQuestion());
        prevBtn.addEventListener('click', () => this.prevQuestion());
        restartBtn.addEventListener('click', () => this.restartQuiz());
    }

    bindFlashcardEvents() {
        const flashcard = document.getElementById('flashcard');
        const prevCardBtn = document.getElementById('prev-card');
        const nextCardBtn = document.getElementById('next-card');

        flashcard.addEventListener('click', () => {
            flashcard.classList.toggle('flipped');
        });

        prevCardBtn.addEventListener('click', () => this.prevCard());
        nextCardBtn.addEventListener('click', () => this.nextCard());
    }

    selectAnswer(optionElement) {
        // Clear previous selections
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected', 'correct', 'incorrect');
        });

        // Mark selected
        optionElement.classList.add('selected');
        
        const answerIndex = parseInt(optionElement.getAttribute('data-answer'));
        this.quizAnswers[this.currentQuiz] = answerIndex;
    }

    nextQuestion() {
        if (this.currentQuiz < this.quizData.length - 1) {
            this.currentQuiz++;
            this.showQuiz();
        } else {
            this.finishQuiz();
        }
    }

    prevQuestion() {
        if (this.currentQuiz > 0) {
            this.currentQuiz--;
            this.showQuiz();
        }
    }

    showQuiz() {
        const quiz = this.quizData[this.currentQuiz];
        const questionText = document.getElementById('question-text');
        const options = document.querySelectorAll('.option');
        const currentQuestion = document.getElementById('current-question');
        const totalQuestions = document.getElementById('total-questions');
        const progress = document.getElementById('quiz-progress');

        questionText.textContent = quiz.question;
        currentQuestion.textContent = this.currentQuiz + 1;
        totalQuestions.textContent = this.quizData.length;

        options.forEach((option, index) => {
            option.textContent = quiz.options[index];
            option.setAttribute('data-answer', index);
            option.classList.remove('selected', 'correct', 'incorrect');
            
            // Restore previous answer if exists
            if (this.quizAnswers[this.currentQuiz] === index) {
                option.classList.add('selected');
            }
        });

        // Update progress bar
        const progressPercent = ((this.currentQuiz + 1) / this.quizData.length) * 100;
        progress.style.width = `${progressPercent}%`;

        // Update button states
        document.getElementById('prev-question').disabled = this.currentQuiz === 0;
        document.getElementById('next-question').textContent = 
            this.currentQuiz === this.quizData.length - 1 ? '완료' : '다음';
    }

    finishQuiz() {
        // Calculate score
        this.score = 0;
        this.quizAnswers.forEach((answer, index) => {
            if (answer === this.quizData[index].correct) {
                this.score++;
            }
        });

        // Show results
        document.querySelector('.quiz-container').style.display = 'none';
        const resultDiv = document.getElementById('quiz-result');
        resultDiv.style.display = 'block';

        document.getElementById('final-score').textContent = this.score;
        document.getElementById('max-score').textContent = this.quizData.length;

        // Update stats
        this.studyStats.quizzesCompleted++;
        this.studyStats.totalScore += this.score;
        this.studyStats.studyTime += 5; // 5 minutes per quiz
        
        // Check for achievements
        this.checkAchievements();
        
        this.saveStudyStats();
        this.updateProgressStats();
    }

    restartQuiz() {
        this.currentQuiz = 0;
        this.score = 0;
        this.quizAnswers = [];
        
        document.querySelector('.quiz-container').style.display = 'block';
        document.getElementById('quiz-result').style.display = 'none';
        
        this.showQuiz();
    }

    nextCard() {
        if (this.currentCard < this.flashcardData.length - 1) {
            this.currentCard++;
            this.showFlashcard();
        }
    }

    prevCard() {
        if (this.currentCard > 0) {
            this.currentCard--;
            this.showFlashcard();
        }
    }

    showFlashcard() {
        const card = this.flashcardData[this.currentCard];
        const flashcard = document.getElementById('flashcard');
        const front = flashcard.querySelector('.flashcard-front h3');
        const frontDesc = flashcard.querySelector('.flashcard-front p');
        const back = flashcard.querySelector('.flashcard-back h3');
        const backDesc = flashcard.querySelector('.flashcard-back p');
        const currentCardSpan = document.getElementById('current-card');
        const totalCardsSpan = document.getElementById('total-cards');

        front.textContent = card.front;
        frontDesc.textContent = "클릭해서 뒤집어보세요 👆";
        
        const backParts = card.back.split('\n');
        back.textContent = backParts[0];
        backDesc.textContent = backParts[1] || '';

        currentCardSpan.textContent = this.currentCard + 1;
        totalCardsSpan.textContent = this.flashcardData.length;

        // Reset flip state
        flashcard.classList.remove('flipped');

        // Update button states
        document.getElementById('prev-card').disabled = this.currentCard === 0;
        document.getElementById('next-card').disabled = this.currentCard === this.flashcardData.length - 1;
    }

    loadStudyStats() {
        const saved = localStorage.getItem('interactiveEduStats');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            quizzesCompleted: 0,
            totalScore: 0,
            studyTime: 0,
            achievements: []
        };
    }

    saveStudyStats() {
        localStorage.setItem('interactiveEduStats', JSON.stringify(this.studyStats));
    }

    updateProgressStats() {
        document.getElementById('completed-quizzes').textContent = this.studyStats.quizzesCompleted;
        
        const avgScore = this.studyStats.quizzesCompleted > 0 
            ? Math.round((this.studyStats.totalScore / (this.studyStats.quizzesCompleted * 5)) * 100)
            : 0;
        document.getElementById('average-score').textContent = `${avgScore}%`;
        
        document.getElementById('study-time').textContent = `${this.studyStats.studyTime}분`;

        this.updateAchievements();
    }

    checkAchievements() {
        const achievements = this.studyStats.achievements;

        // First quiz completion
        if (this.studyStats.quizzesCompleted >= 1 && !achievements.includes('first-quiz')) {
            achievements.push('first-quiz');
        }

        // Perfect score
        if (this.score === 5 && !achievements.includes('perfect-score')) {
            achievements.push('perfect-score');
        }

        // Study streak (simplified - just check if completed multiple quizzes)
        if (this.studyStats.quizzesCompleted >= 3 && !achievements.includes('study-streak')) {
            achievements.push('study-streak');
        }
    }

    updateAchievements() {
        const achievements = document.querySelectorAll('.achievement');
        
        achievements.forEach((achievement, index) => {
            const achievementTypes = ['first-quiz', 'study-streak', 'perfect-score'];
            const achievementType = achievementTypes[index];
            
            if (this.studyStats.achievements.includes(achievementType)) {
                achievement.classList.remove('locked');
                achievement.classList.add('unlocked');
            }
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveEduApp();
});

// Add some interactive animations
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click animation to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add loading animation for page transitions
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.main').style.opacity = '0.8';
            setTimeout(() => {
                document.querySelector('.main').style.opacity = '1';
            }, 200);
        });
    });
});