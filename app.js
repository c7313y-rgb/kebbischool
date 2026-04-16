const app = document.getElementById('app');
const STORAGE_KEY = 'gakken_robot_lab_demo_v2';

const lessonSeeds = [
  ['情報社会','情報と私たちの生活','情報とデータの違いを理解し、身近な情報技術の使われ方を説明できる。','家庭で見つけた情報技術を3つ記録する。','身近な情報技術マップ'],
  ['情報社会','情報モラルとルール','個人情報・著作権・公開範囲の考え方を説明できる。','家庭向け情報モラルメモを作る。','情報モラル注意カード'],
  ['情報社会','信頼できる情報の見分け方','出典・日付・根拠から情報の信頼性を判断できる。','ニュースを1本選び、信頼性を4観点で確認する。','情報信頼性チェック表'],
  ['情報デザイン','身近な課題を見つける','困りごとを具体化し、だれのどんな課題か言語化できる。','家や学校で不便なことを1つ観察する。','課題発見メモ'],
  ['情報デザイン','伝わる見た目の基本','文字・色・配置の基本を使って資料を改善できる。','見やすいポスターの共通点を3つ挙げる。','改善前後の比較シート'],
  ['情報デザイン','文章・表・図の使い分け','同じ内容を目的に応じて表現し分けられる。','1日の流れを図で表す。','文章・表・図の比較ワーク'],
  ['情報デザイン','話し方の型をつかむ','結論→理由→具体例の型で短く説明できる。','30秒説明を家で1回練習する。','30秒説明シート'],
  ['情報デザイン','ミニ発表と質問応答','短い発表を行い、質問に答えて内容を補足できる。','質問された内容を振り返り、答えを直す。','1分発表動画またはメモ'],
  ['問題解決・プログラミング','手順で考える','行動を細かい手順に分解して表現できる。','朝の支度を手順化する。','アルゴリズムメモ'],
  ['問題解決・プログラミング','条件で動きを変える','条件分岐の考え方を生活場面と結びつけて説明できる。','もし〜ならの例を2つ集める。','分岐フローチャート'],
  ['問題解決・プログラミング','くり返しの考え方','反復処理の意味と、終わり方の指定を説明できる。','繰り返しがある行動を1つ選んで図にする。','反復整理シート'],
  ['問題解決・プログラミング','順次・分岐・反復を組み合わせる','3つの基本構造を組み合わせた流れ図を作成できる。','生活の中の流れ図を1つ完成させる。','複合フローチャート'],
  ['プログラミング実践','ロボットへの命令を考える','入力・処理・出力の流れを理解し、命令の意味を説明できる。','ロボットにやらせたい動作を3つ考える。','命令設計メモ'],
  ['プログラミング実践','入力で結果が変わる会話','入力によって出力が変わる仕組みを作れる。','会話例を1つ増やす。','対話プログラム案'],
  ['プログラミング実践','条件分岐つきクイズを作る','正解・不正解で表示を変える簡単なクイズを作れる。','クイズを1問追加する。','分岐クイズ'],
  ['プログラミング実践','くり返しを使って効率化する','同じ処理をまとめるメリットを説明し、作品に反映できる。','同じ処理を3回使う例を探す。','反復つき作品'],
  ['ネットワーク・セキュリティ','ネットワークの基本','端末・ルータ・サーバの役割をイメージで説明できる。','家庭内ネットワークを観察する。','ネットワーク図'],
  ['ネットワーク・セキュリティ','安全に使うための工夫','安全なパスワードや認証の考え方を説明できる。','自分の対策を見直しチェックする。','セキュリティ対策表'],
  ['データ活用','データを集めて整理する','目的に合わせてデータを集め、表に整理できる。','簡単なアンケートを作る。','データ整理表'],
  ['データ活用','グラフで読み取る','表をグラフにし、比較や傾向を言葉で説明できる。','家族向けにグラフを1つ作る。','グラフと考察メモ'],
  ['探究プロジェクト','探究テーマを決める','身近な課題から探究テーマを設定できる。','テーマ候補を3つ出す。','企画骨子'],
  ['探究プロジェクト','解決案を設計する','対象・方法・必要なデータを整理して計画を立てられる。','中間発表用のメモを整える。','プロジェクト計画書'],
  ['探究プロジェクト','発表を磨く','根拠と提案が伝わる発表資料に改善できる。','発表練習を1回行う。','最終発表スライド'],
  ['探究プロジェクト','最終発表と振り返り','1年間の学びをまとめ、次につながる振り返りができる。','学習の振り返りを家で共有する。','発表ポートフォリオ']
];

const domainColors = {
  '情報社会': '#6ca8ff',
  '情報デザイン': '#54c39a',
  '問題解決・プログラミング': '#ffb95e',
  'プログラミング実践': '#7f8cff',
  'ネットワーク・セキュリティ': '#ff7e8b',
  'データ活用': '#57c7c1',
  '探究プロジェクト': '#a978ff'
};

const warmups = [
  '身の回りで情報が使われている場面を3つ挙げよう。','SNSに投稿するときに迷う内容を考えよう。','すぐ信じてはいけない情報の例を出そう。','学校や家で不便なことを1つ書こう。','見やすい資料と見にくい資料の違いは？','同じ内容でも表し方を変えるとどう見える？','1分で伝えたいことを決めよう。','前回の発表で良かった工夫は？','朝の支度を細かく分けると何ステップ？','天気や時間で行動が変わる場面は？','くり返している行動は何？','順番・条件・くり返しが全部ある場面は？','ロボットに命令するとき、言い方はどう変える？','入力すると結果が変わる例を考えよう。','クイズで正解か不正解かをどう分ける？','同じ命令を何度も書くと何が起きる？','ネットにつながる機器を挙げよう。','安全なパスワードとは？','アンケートで知りたいことは何？','棒グラフと円グラフの違いは？','身近で調べたいテーマは何？','計画を進めるために必要なことは？','発表で一番伝えたいことは？','1年前よりできるようになったことは？'
];

function buildQuiz(id, title, unit) {
  const q1 = {
    q: `第${id}回「${title}」で大切にしたいこととして最も近いものはどれ？`,
    choices: ['考えた理由を説明できること', '用語を全部暗記すること', '早く終わらせること'],
    answer: 0,
    explain: 'この授業では、理由や根拠を言葉にできることを重視する。'
  };
  const q2Map = {
    '情報社会': ['情報の信頼性を確かめる観点として適切なのは？', ['出典や日付を見る', '見た目が派手か見る', '友だちが信じたかを見る'], 0, '出典・日付・根拠が基本。'],
    '情報デザイン': ['伝わる資料づくりで特に重要なのは？', ['文字・色・配置を整理する', '文字を小さく詰め込む', '飾りを増やす'], 0, '相手に伝わる見せ方が重要。'],
    '問題解決・プログラミング': ['アルゴリズムを考えるときに必要なのは？', ['手順をあいまいにしない', 'とりあえず長く書く', '途中を省略する'], 0, '抜けやあいまいさがないかが大切。'],
    'プログラミング実践': ['入力・処理・出力の説明として適切なのは？', ['入力を受けて処理し、結果を出す', '処理を省略して結果だけ出す', '入力だけを記録する'], 0, 'プログラムの基本の流れ。'],
    'ネットワーク・セキュリティ': ['安全に使うための行動として適切なのは？', ['パスワードを使い回さない', '友だちと共有する', 'メモを机に貼る'], 0, '認証情報の管理が基本。'],
    'データ活用': ['データ活用の最初の一歩は？', ['何を知りたいか決める', 'すぐグラフにする', '全部同じ形式にする'], 0, '目的が先。'],
    '探究プロジェクト': ['よい探究テーマに必要な条件として近いのは？', ['身近で検証しやすいこと', '大きすぎて終わらないこと', '答えが最初から決まっていること'], 0, '検証可能性と具体性が重要。']
  };
  const u = q2Map[unit];
  const q2 = { q: u[0], choices: u[1], answer: u[2], explain: u[3] };
  const q3 = {
    q: '成果物を残す目的として最も近いものはどれ？',
    choices: ['自分の考えを見返し、次につなげるため', '提出だけすればよいから', '先生が代わりにまとめるから'],
    answer: 0,
    explain: '成果物は学びを見える化し、振り返りや発表に使う。'
  };
  return [q1,q2,q3];
}

const lessons = lessonSeeds.map((seed, idx) => ({
  id: idx + 1,
  unit: seed[0],
  title: seed[1],
  goal: seed[2],
  homework: seed[3],
  output: seed[4],
  color: domainColors[seed[0]],
  warmup: warmups[idx],
  teacherText: `今日は「${seed[1]}」を扱います。大切なのは、答えを暗記することではなく、なぜそう考えるかを自分の言葉で説明できるようになることです。ロボットの問いかけに答えながら、最後は自分の考えを成果物として残しましょう。`,
  reviewHint: `${seed[1]}で使った重要語を3つ選び、1文ずつ説明できるようにする。`,
  previewHint: `次回に向けて「${idx < lessonSeeds.length - 1 ? lessonSeeds[idx + 1][1] : '1年間の振り返り'}」に関する身近な例を探しておく。`,
  prep: 'ロボット・タブレット・ワークブック・投影資料・筆記具',
  quiz: buildQuiz(idx + 1, seed[1], seed[0])
}));

const unitDescriptions = Object.fromEntries([...new Set(lessonSeeds.map(s => s[0]))].map(unit => [unit, `${unit}をテーマに、理解→説明→実践へ進むユニット。`]));

const initialData = {
  teacher: { username: 'teacher', password: 'demo123', name: '学研教室 先生' },
  students: [
    { id: 's1', username: 'student1', password: 'demo123', name: '青木 ひかり', grade: '中学2年', completedLessons: [1,2,3,4,5,6,7,8,9,10], quizScores: {1:100,2:67,3:67,4:100,5:100,6:67,7:100,8:67,9:67,10:33}, focus: ['条件分岐','情報の信頼性'], favorites: ['情報デザイン','発表'], notes: '表現力が高い。条件分岐は補助があると安定。'},
    { id: 's2', username: 'student2', password: 'demo123', name: '佐藤 そうた', grade: '高校1年', completedLessons: [1,2,3,4,5,6,7,8,9,10,11,12], quizScores: {1:67,2:67,3:100,4:67,5:67,6:100,7:67,8:100,9:100,10:67,11:67,12:67}, focus: ['情報デザイン','発表'], favorites: ['プログラミング','流れ図'], notes: '論理構成が強い。話し方の整理を伸ばしたい。'},
    { id: 's3', username: 'student3', password: 'demo123', name: '山田 りく', grade: '中学3年', completedLessons: [1,2,3,4,5,6], quizScores: {1:67,2:33,3:67,4:67,5:67,6:33}, focus: ['情報モラル','文章・表・図'], favorites: ['ロボット対話','クイズ'], notes: '集中して取り組めるが、言語化は補助が必要。'}
  ]
};

function clone(obj){ return JSON.parse(JSON.stringify(obj)); }
function loadState(){ try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || clone(initialData); } catch { return clone(initialData); } }
let state = loadState();
function persist(){ try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {} }

const session = { role: null, userId: null, filter: 'all', lessonModal: null, activeTab: 'learn', quizAnswers: {}, quizSubmitted: false };

function getStudent(id){ return state.students.find(s => s.id === id); }
function avg(values){ return values.length ? Math.round(values.reduce((a,b)=>a+b,0)/values.length) : 0; }
function studentCompletion(student){ return Math.round((student.completedLessons.length / lessons.length) * 100); }
function studentAvgScore(student){ return avg(Object.values(student.quizScores)); }
function lessonDone(student,id){ return student.completedLessons.includes(id); }
function domainScore(student, unit){ return avg(lessons.filter(l => l.unit === unit).map(l => student.quizScores[l.id]).filter(v => typeof v === 'number')); }
function getStrength(student){ return [...new Set(lessons.map(l => l.unit))].map(unit => ({unit, score: domainScore(student, unit)})).sort((a,b)=>b.score-a.score)[0]; }
function getWeak(student){ return [...new Set(lessons.map(l => l.unit))].map(unit => ({unit, score: domainScore(student, unit) || 999})).sort((a,b)=>a.score-b.score)[0]; }
function statusLabel(student){ const c = studentCompletion(student); const s = studentAvgScore(student); if (c >= 60 && s >= 80) return ['絶好調','good']; if (s < 60) return ['要フォロー','weak']; if (c < 35) return ['進行サポート','warn']; return ['安定進行','info']; }

function login(username, password){
  if (username === state.teacher.username && password === state.teacher.password) {
    session.role = 'teacher'; session.userId = 'teacher'; render(); return;
  }
  const stu = state.students.find(s => s.username === username && s.password === password);
  if (stu) { session.role = 'student'; session.userId = stu.id; render(); return; }
  alert('ログイン情報が一致しません。teacher / student1 / student2 と demo123 をご利用ください。');
}
function logout(){ session.role = null; session.userId = null; session.lessonModal = null; session.filter = 'all'; render(); }
function resetDemo(){ state = clone(initialData); persist(); logout(); }
function openLesson(id, tab='learn'){ session.lessonModal = id; session.activeTab = tab; session.quizAnswers = {}; session.quizSubmitted = false; render(); }
function closeLesson(){ session.lessonModal = null; session.quizAnswers = {}; session.quizSubmitted = false; render(); }
function markDone(studentId, lessonId){ const s = getStudent(studentId); if (!s.completedLessons.includes(lessonId)) { s.completedLessons.push(lessonId); s.completedLessons.sort((a,b)=>a-b); persist(); } }
function saveQuiz(studentId, lessonId, score){ const s = getStudent(studentId); s.quizScores[lessonId] = score; markDone(studentId, lessonId); persist(); }

function render(){
  if (!session.role) return renderLanding();
  if (session.role === 'teacher') return renderTeacher();
  return renderStudent();
}

function shell(title, sub, body){
  app.innerHTML = `
    <div class="app-shell excited">
      <header class="topbar glassy">
        <div class="container topbar-inner">
          <div class="brand">
            <div class="brand-badge spark">🤖</div>
            <div class="brand-text">${title}<small>${sub}</small></div>
          </div>
          <div class="nav-actions">
            <button type="button" class="btn btn-secondary" data-action="home">ホーム</button>
            <button type="button" class="btn btn-ghost" data-action="reset">デモ初期化</button>
            <button type="button" class="btn btn-primary" data-action="logout">ログアウト</button>
          </div>
        </div>
      </header>
      ${body}
    </div>`;
}

function renderLanding(){
  app.innerHTML = `
  <div class="app-shell excited">
    <header class="topbar glassy">
      <div class="container topbar-inner">
        <div class="brand">
          <div class="brand-badge spark">🤖</div>
          <div class="brand-text">学研 Kebbi情報ラボ<small>Kebbi × Edutex サイバー宇宙教室デモ</small></div>
        </div>
        <div class="nav-actions">
          <button type="button" class="btn btn-secondary" data-quick="teacher">先生デモ</button>
          <button type="button" class="btn btn-secondary" data-quick="student1">生徒デモA</button>
          <button type="button" class="btn btn-primary" data-quick="student2">生徒デモB</button>
        </div>
      </div>
    </header>

    <main>
      <section class="hero wow">
        <div class="orb orb-a"></div><div class="orb orb-b"></div><div class="orb orb-c"></div>
        <div class="container hero-grid">
          <div class="hero-panel hero-copy glow-card">
            <span class="kicker">GitHub Pages公開向け・静的デモ</span>
            <h1><span class="accent">Kebbi</span>と学ぶほど、<br>宇宙みたいに未来がひらく。</h1>
            <p>先生には運営しやすいダッシュボード、生徒には「つい次もやりたくなる」ワクワク感を。進行度、得意・苦手、復習、予習、ミニテストまでタブレットで完結します。</p>
            <div class="hero-actions">
              <button type="button" class="btn btn-primary" data-quick="teacher">先生として試す</button>
              <button type="button" class="btn btn-secondary" data-quick="student1">生徒として試す</button>
            </div>
            <div class="demo-note">デモアカウント: teacher / student1 / student2　パスワード: <strong>demo123</strong></div>
          </div>
          <div class="hero-visual-grid">
            <div class="hero-art glow-card"><img src="assets/kebbi-cosmic-hero.svg" alt="生徒とロボット"></div>
            <div class="hero-art"><img src="assets/kebbi-galaxy-classroom.svg" alt="未来の学習空間"></div>
            <div class="hero-art"><img src="assets/kebbi-orbit-dashboard.svg" alt="先生ダッシュボード"></div>
            <div class="hero-art"><img src="assets/kebbi-nebula-quiz.svg" alt="生徒学習"></div>
          </div>
        </div>
      </section>

      <section class="container adventure-strip">
        <div class="adventure-card panel"><img src="assets/kebbi-nebula-quiz.svg" alt="達成バッジ"><h3>達成でうれしい</h3><p>進行率・正答率・バッジが連動し、毎回の成長が見える設計。</p></div>
        <div class="adventure-card panel"><img src="assets/kebbi-cosmic-hero.svg" alt="ロボットコーチ"><h3>Kebbiが伴走</h3><p>問いかけ、ヒント、励まし、復習提案まで一体でサポート。</p></div>
        <div class="adventure-card panel"><img src="assets/kebbi-galaxy-classroom.svg" alt="教室の活気"><h3>教室が盛り上がる</h3><p>先生と生徒が同じ教材基盤で動けるため、運用が直感的で授業が華やぐ。</p></div>
      </section>

      <section class="metrics">
        <div class="container metrics-grid">
          <div class="metric-card"><div class="label">年間カリキュラム</div><div class="value">24回</div><div class="hint">授業ごとのめあて・宿題・成果物を搭載</div></div>
          <div class="metric-card"><div class="label">学習支援</div><div class="value">予習・復習</div><div class="hint">苦手の再学習まで一気通貫</div></div>
          <div class="metric-card"><div class="label">先生機能</div><div class="value">進行可視化</div><div class="hint">生徒別の得意・苦手を即確認</div></div>
          <div class="metric-card"><div class="label">公開方式</div><div class="value">静的サイト</div><div class="hint">GitHub Pagesへそのまま配置可能</div></div>
        </div>
      </section>

      <section class="container">
        <div class="section-title"><h2>デモログイン</h2><p>まずは先生モードか生徒モードを選んで体験できます。</p></div>
        <div class="login-grid">
          ${landingCard('先生アカウント','teacher','先生用テキスト表示・生徒分析・フォロー優先度を確認')}
          ${landingCard('生徒アカウントA','student1','学習・ミニテスト・復習サポートを体験')}
          ${landingCard('生徒アカウントB','student2','別の進行状況・別の得意不得意を確認')}
        </div>
      </section>

      <section class="container" style="padding-top: 18px; padding-bottom: 34px;">
        <div class="panel glow-card" style="padding:24px;">
          <div class="section-title" style="margin-bottom:16px;"><h2>手動ログイン</h2><p>公開時の挙動確認用フォームです。</p></div>
          <form id="login-form" class="stack-actions">
            <label class="field">ユーザー名<input name="username" value="teacher"></label>
            <label class="field">パスワード<input name="password" type="password" value="demo123"></label>
            <button class="btn btn-primary" type="submit">ログイン</button>
          </form>
        </div>
      </section>
    </main>
  </div>`;
}

function landingCard(title,id,text){
  return `<div class="login-card panel glow-card"><img src="assets/${id==='teacher'?'teacher-dashboard':'student-learning'}.svg" alt="${title}"><h3>${title}</h3><p>${text}</p><div class="login-meta"><div><strong>ID:</strong> ${id}</div><div><strong>PW:</strong> demo123</div></div><button type="button" class="btn btn-primary" data-quick="${id}">入る</button></div>`;
}

function renderTeacher(){
  const classAvg = avg(state.students.map(studentAvgScore));
  const classProgress = avg(state.students.map(studentCompletion));
  const nextLesson = lessons.find(l => state.students.some(s => !lessonDone(s,l.id))) || lessons[lessons.length-1];
  const units = [...new Set(lessons.map(l=>l.unit))];
  const insights = units.map(unit => ({unit, score: avg(state.students.map(s => domainScore(s,unit)).filter(Boolean))})).sort((a,b)=>a.score-b.score);
  shell('学研ロボット情報ラボ｜先生モード','先生用テキスト・Kebbiダッシュボード・苦手可視化', `
    <main class="app-main">
      <div class="container">
        <div class="toolbar bright-toolbar">
          <div>
            <h1>${state.teacher.name} ダッシュボード</h1>
            <p>各生徒のステータス、進行率、得意・苦手、フォロー優先度をひと目で把握。Kebbiらしい対話授業の運用を想定した先生向けUIです。</p>
          </div>
          <div class="toolbar-visuals">
            <img src="assets/kebbi-cosmic-hero.svg" alt="ロボットコーチ">
            <img src="assets/kebbi-galaxy-classroom.svg" alt="未来学習空間">
          </div>
        </div>

        <div class="dashboard-grid teacher-refresh">
          <div class="column-stack">
            <div class="card glow-card">
              <h3>教室全体のステータス</h3>
              <div class="kpi-row">
                <div class="kpi"><div class="label">平均進行率</div><div class="num">${classProgress}%</div></div>
                <div class="kpi"><div class="label">平均ミニテスト</div><div class="num">${classAvg}%</div></div>
                <div class="kpi"><div class="label">次回授業</div><div class="num small">第${nextLesson.id}回</div></div>
                <div class="kpi"><div class="label">デモ生徒数</div><div class="num">${state.students.length}名</div></div>
              </div>
            </div>

            <div class="card glow-card">
              <div class="row-between"><h3>生徒ごとのステータス表示</h3><button type="button" class="btn btn-primary" data-action="teacher-text">本時テキスト</button></div>
              <div class="student-list expanded">
                ${state.students.map(s => {
                  const status = statusLabel(s);
                  const strength = getStrength(s);
                  const weak = getWeak(s);
                  return `
                    <div class="student-row rich" data-student-detail="${s.id}">
                      <div class="avatar spark">${s.name.slice(0,1)}</div>
                      <div class="student-main">
                        <div class="row-between wrap"><h4>${s.name} <small>${s.grade}</small></h4><span class="tag ${status[1]}">${status[0]}</span></div>
                        <div class="student-stats-inline">
                          <span>進行率 ${studentCompletion(s)}%</span>
                          <span>平均点 ${studentAvgScore(s)}%</span>
                          <span>得意 ${strength.unit}</span>
                          <span>苦手 ${weak.unit}</span>
                        </div>
                        <div class="micro-bars">
                          <div><label>進行</label><div class="bar"><span style="width:${studentCompletion(s)}%"></span></div></div>
                          <div><label>理解</label><div class="bar"><span style="width:${Math.max(studentAvgScore(s),8)}%"></span></div></div>
                        </div>
                      </div>
                      <div><button type="button" class="btn btn-secondary" data-student-detail="${s.id}">詳細</button></div>
                    </div>`;
                }).join('')}
              </div>
            </div>
          </div>

          <div class="column-stack">
            <div class="card sidebar-card glow-card">
              <img src="assets/kebbi-orbit-dashboard.svg" alt="先生ダッシュボード">
              <h3>本時の先生用テキスト</h3>
              <p><strong>第${nextLesson.id}回 ${nextLesson.title}</strong></p><p class="muted">Kebbiの親しみやすい対話を起点に、情報Ⅰの概念を具体例へ落とし込む進行です。</p>
              <p>${nextLesson.teacherText}</p>
              <div class="insight-list">
                <div class="insight"><strong>導入の問い</strong>${nextLesson.warmup}</div>
                <div class="insight"><strong>準備物</strong>${nextLesson.prep}</div>
                <div class="insight"><strong>成果物</strong>${nextLesson.output}</div>
              </div>
            </div>

            <div class="card glow-card">
              <h3>クラスの得意・苦手マップ</h3>
              <div class="domain-grid">
                ${insights.map(item => `<div class="domain-chip"><strong>${item.unit}</strong><div class="bar"><span style="width:${Math.max(item.score,10)}%; background:linear-gradient(90deg, ${domainColors[item.unit]}, #8cf0d5);"></span></div><div class="muted">平均 ${item.score}%</div></div>`).join('')}
              </div>
            </div>

            <div class="card glow-card">
              <h3>優先アクション</h3>
              <div class="insight-list">
                <div class="insight"><span class="tag weak">重点</span><strong>補強したい領域</strong>${insights[0].unit}。授業導入で例を1つ追加すると理解差を詰めやすい。</div>
                <div class="insight"><span class="tag good">強み</span><strong>伸ばしやすい領域</strong>${insights[insights.length-1].unit}。発表や応用課題に回すと盛り上がる。</div>
                <div class="insight"><span class="tag warn">注意</span><strong>個別フォロー</strong>${state.students.sort((a,b)=>studentAvgScore(a)-studentAvgScore(b))[0].name} は復習先行が安全。</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ${teacherStudentModal()}
    </main>
  `);
}

function teacherStudentModal(){
  const id = session.lessonModal && session.lessonModal.toString().startsWith('student:') ? session.lessonModal.split(':')[1] : null;
  if (!id) return '';
  const s = getStudent(id);
  return `
    <div class="modal-backdrop" data-close-lesson>
      <div class="modal-panel fancy-panel" data-modal-panel>
        <div class="modal-head"><div><h2>${s.name} の詳細</h2><div class="muted">${s.grade} / ステータス: ${statusLabel(s)[0]}</div></div><button type="button" class="btn btn-secondary" data-close-lesson>閉じる</button></div>
        <div class="lesson-layout">
          <div class="lesson-pane">
            <img src="assets/kebbi-galaxy-classroom.svg" alt="学習中の教室" class="pane-hero">
            <h4>先生メモ</h4><p>${s.notes}</p>
            <p><strong>得意:</strong> ${s.favorites.join(' / ')}</p>
            <p><strong>苦手:</strong> ${s.focus.join(' / ')}</p>
          </div>
          <div class="lesson-pane">
            <h4>受講一覧</h4>
            <div class="mini-lesson-list">
              ${lessons.map(l => `<div class="teacher-lesson"><div><strong>第${l.id}回 ${l.title}</strong><div class="muted">${l.unit}</div></div><span class="progress-badge">${lessonDone(s,l.id) ? (s.quizScores[l.id] ?? '完了') + (s.quizScores[l.id] ? '%' : '') : '未学習'}</span></div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function renderStudent(){
  const s = getStudent(session.userId);
  const next = lessons.find(l => !lessonDone(s,l.id)) || lessons[lessons.length - 1];
  const strength = getStrength(s);
  const weak = getWeak(s);
  const status = statusLabel(s);
  const filtered = filterLessons(s);
  shell(`学研ロボット情報ラボ｜${s.name}`,'Kebbiと一緒に進める生徒モード', `
    <main class="app-main">
      <div class="container">
        <section class="student-hero glow-card">
          <div class="student-hero-copy">
            <span class="pill">あなたの現在ステータス</span>
            <h1>${status[0]}</h1>
            <p>次に取り組むのは <strong>第${next.id}回 ${next.title}</strong>。今日もKebbiと一緒に、ひとつ先の自分へ進もう。</p>
            <div class="hero-actions">
              <button type="button" class="btn btn-primary" data-open="${next.id}" data-tab="learn">つづきから学ぶ</button>
              <button type="button" class="btn btn-secondary" data-action="open-review">苦手を復習</button>
            </div>
          </div>
          <div class="student-hero-visuals">
            <img src="assets/kebbi-nebula-quiz.svg" alt="生徒の学習">
            <img src="assets/kebbi-nebula-quiz.svg" alt="達成バッジ">
          </div>
        </section>

        <div class="student-grid new-look">
          <div class="column-stack">
            <div class="card glow-card">
              <h3>学習ステータス表示</h3>
              <div class="status-banner-row">
                <div class="status-banner-chip ${status[1]}">現在: ${status[0]}</div>
                <div class="status-banner-note">Kebbiが進行率・ミニテスト・単元理解から毎回更新</div>
              </div>
              <div class="status-grid">
                <div class="score-box large"><div class="label">進行率</div><div class="num">${studentCompletion(s)}%</div><small>${s.completedLessons.length} / ${lessons.length} 回完了</small></div>
                <div class="score-box large"><div class="label">平均ミニテスト</div><div class="num">${studentAvgScore(s)}%</div><small>理解のめやす</small></div>
                <div class="score-box large"><div class="label">得意</div><div class="num small">${strength.unit}</div><small>発表や応用で伸ばそう</small></div>
                <div class="score-box large"><div class="label">苦手</div><div class="num small">${weak.unit}</div><small>復習モードを優先</small></div>
              </div>
            </div>

            <div class="card glow-card">
              <h3>単元別の理解度</h3>
              <div class="domain-grid">
                ${[...new Set(lessons.map(l=>l.unit))].map(unit => `<div class="domain-chip"><strong>${unit}</strong><div class="bar"><span style="width:${Math.max(domainScore(s,unit),10)}%; background:linear-gradient(90deg, ${domainColors[unit]}, #9ae9ff);"></span></div><div class="muted">${domainScore(s,unit)}%</div></div>`).join('')}
              </div>
            </div>
          </div>

          <div class="column-stack">
            <div class="card sidebar-card glow-card">
              <img src="assets/kebbi-cosmic-hero.svg" alt="ロボットコーチ">
              <h3>Kebbiからのメッセージ</h3>
              <p>「${next.title}」では、まず <strong>${next.warmup}</strong> に答えてみよう。言葉にできたら理解は一段進む。</p>
              <div class="insight-list">
                <div class="insight"><strong>今日の目標</strong>${next.goal}</div>
                <div class="insight"><strong>予習</strong>${next.previewHint}</div>
                <div class="insight"><strong>復習</strong>${next.reviewHint}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="filters">
          ${filterBtn('all','すべて')}
          ${filterBtn('next','これから学ぶ')}
          ${filterBtn('review','復習推奨')}
          ${[...new Set(lessons.map(l=>l.unit))].map(unit => filterBtn(unit, unit)).join('')}
        </div>

        <div class="cards-grid lively">
          ${filtered.map(l => lessonCard(s, l)).join('')}
        </div>
      </div>
      ${studentLessonModal(s)}
    </main>
  `);
}

function filterLessons(student){
  if (session.filter === 'all') return lessons;
  if (session.filter === 'next') { const nextId = lessons.find(l => !lessonDone(student,l.id))?.id || lessons.length; return lessons.filter(l => l.id >= nextId && l.id <= Math.min(nextId + 5, lessons.length)); }
  if (session.filter === 'review') return lessons.filter(l => lessonDone(student,l.id) && (student.quizScores[l.id] || 0) < 70);
  return lessons.filter(l => l.unit === session.filter);
}
function filterBtn(value,label){ return `<button type="button" class="filter-chip ${session.filter===value?'active':''}" data-filter="${value}">${label}</button>`; }

function lessonCard(student, l){
  const done = lessonDone(student,l.id);
  const score = student.quizScores[l.id];
  const mood = !done ? ['未学習','warn'] : score >= 80 ? ['得意','good'] : score >= 60 ? ['完了','info'] : ['復習','weak'];
  return `<div class="lesson-card card glow-card"><div class="lesson-cover" style="background:linear-gradient(135deg, ${l.color}, rgba(255,255,255,.18));"><span>第${l.id}回</span><strong>${l.unit}</strong></div><div class="lesson-body"><div class="lesson-meta"><span class="tag ${mood[1]}">${mood[0]}</span><span class="tag" style="background:${l.color}22;color:${l.color};">${done ? (score ? score + '%' : '完了') : 'これから'}</span></div><h3>${l.title}</h3><p>${l.goal}</p><div class="lesson-actions"><button type="button" class="btn btn-primary" data-open="${l.id}" data-tab="learn">学習する</button><button type="button" class="btn btn-secondary" data-open="${l.id}" data-tab="quiz">ミニテスト</button></div></div></div>`;
}

function studentLessonModal(student){
  if (!session.lessonModal || String(session.lessonModal).startsWith('student:')) return '';
  const lesson = lessons.find(l => l.id === Number(session.lessonModal));
  if (!lesson) return '';
  return `
    <div class="modal-backdrop" data-close-lesson>
      <div class="modal-panel fancy-panel" data-modal-panel>
        <div class="modal-head">
          <div><h2>第${lesson.id}回 ${lesson.title}</h2><div class="muted">${lesson.unit} / ${unitDescriptions[lesson.unit]}</div></div>
          <button type="button" class="btn btn-secondary" data-close-lesson>閉じる</button>
        </div>
        <div class="modal-tabs">
          ${['learn','quiz','review','preview'].map(tab => `<button type="button" class="tab-btn ${session.activeTab===tab?'active':''}" data-tab-switch="${tab}">${({learn:'学習',quiz:'ミニテスト',review:'復習',preview:'予習'})[tab]}</button>`).join('')}
        </div>
        ${lessonTab(student, lesson)}
      </div>
    </div>`;
}

function lessonTab(student, lesson){
  if (session.activeTab === 'learn') return `
    <div class="lesson-layout">
      <div class="lesson-pane">
        <img src="assets/kebbi-galaxy-classroom.svg" alt="未来ラボ" class="pane-hero">
        <h4>今日のめあて</h4><p>${lesson.goal}</p>
        <h4>導入の問い</h4><p>${lesson.warmup}</p>
        <h4>学習ガイド</h4>
        <ul><li>${lesson.teacherText}</li><li>Kebbiに1回説明してみる。</li><li>最後は成果物に残す。</li></ul>
      </div>
      <div class="lesson-pane">
        <img src="assets/kebbi-cosmic-hero.svg" alt="ロボットコーチ" class="pane-hero small-hero">
        <h4>Kebbiからのヒント</h4><p>わからないときは「結論→理由→具体例」の順に言ってみよう。</p>
        <div class="insight-list">
          <div class="insight"><strong>宿題</strong>${lesson.homework}</div>
          <div class="insight"><strong>成果物</strong>${lesson.output}</div>
          <div class="insight"><strong>準備物</strong>${lesson.prep}</div>
        </div>
        <div class="hero-actions"><button type="button" class="btn btn-primary" data-mark-complete="${lesson.id}">この回を完了にする</button><button type="button" class="btn btn-secondary" data-tab-switch="quiz">ミニテストへ</button></div>
      </div>
    </div>`;

  if (session.activeTab === 'quiz') {
    const selected = session.quizAnswers;
    const submitted = session.quizSubmitted;
    const raw = lesson.quiz.reduce((sum, q, idx) => sum + (selected[idx] === q.answer ? 1 : 0), 0);
    const score = Math.round((raw / lesson.quiz.length) * 100);
    return `
      <div class="lesson-layout">
        <div class="lesson-pane">
          <img src="assets/kebbi-nebula-quiz.svg" alt="達成バッジ" class="pane-hero small-hero">
          <h4>ミニテスト</h4>
          ${lesson.quiz.map((q, idx) => `
            <div class="quiz-block">
              <strong>Q${idx+1}. ${q.q}</strong>
              ${q.choices.map((choice, cIdx) => {
                const on = selected[idx] === cIdx;
                const cls = submitted ? (cIdx === q.answer ? 'correct' : on ? 'wrong' : '') : (on ? 'selected' : '');
                return `<button type="button" class="quiz-choice ${cls}" data-answer="${idx}:${cIdx}" >${choice}</button>`;
              }).join('')}
              ${submitted ? `<div class="muted">解説: ${q.explain}</div>` : ''}
            </div>`).join('')}
          <div class="hero-actions"><button type="button" class="btn btn-primary" data-submit-quiz="${lesson.id}">採点する</button><button type="button" class="btn btn-secondary" data-tab-switch="review">復習を見る</button></div>
          ${submitted ? `<div class="score-banner">今回のスコア: ${score}%</div>` : ''}
        </div>
        <div class="lesson-pane">
          <img src="assets/kebbi-galaxy-classroom.svg" alt="教室エネルギー" class="pane-hero">
          <h4>テストのコツ</h4>
          <ul><li>授業のめあてに戻る</li><li>重要語を自分の言葉で言い換える</li><li>採点後は復習へ進む</li></ul>
          <div class="insight-list"><div class="insight"><strong>前回記録</strong>${student.quizScores[lesson.id] ? student.quizScores[lesson.id] + '%' : 'まだ受験していません'}</div></div>
        </div>
      </div>`;
  }

  if (session.activeTab === 'review') return `
    <div class="lesson-layout">
      <div class="lesson-pane"><img src="assets/kebbi-cosmic-hero.svg" alt="ロボットコーチ" class="pane-hero"><h4>復習ポイント</h4><p>${lesson.reviewHint}</p><ul><li>重要語を3つ選ぶ</li><li>成果物を見返す</li><li>30秒で説明し直す</li></ul></div>
      <div class="lesson-pane"><img src="assets/kebbi-nebula-quiz.svg" alt="バッジ" class="pane-hero small-hero"><h4>苦手サポート</h4><div class="insight-list"><div class="insight"><strong>おすすめ</strong>どの言葉の意味があいまいかを言ってみる</div><div class="insight"><strong>次の行動</strong>もう一度ミニテストを受ける</div></div><button type="button" class="btn btn-primary" data-tab-switch="quiz">ミニテストへ戻る</button></div>
    </div>`;

  return `
    <div class="lesson-layout">
      <div class="lesson-pane"><img src="assets/kebbi-galaxy-classroom.svg" alt="未来ラボ" class="pane-hero"><h4>予習</h4><p>${lesson.previewHint}</p><ul><li>身近な例を1つ探す</li><li>自分ならどう考えるかを書く</li><li>わからない言葉を1つ調べる</li></ul></div>
      <div class="lesson-pane"><img src="assets/kebbi-nebula-quiz.svg" alt="生徒学習" class="pane-hero small-hero"><h4>先取りミッション</h4><div class="insight-list"><div class="insight"><strong>問い</strong>${lesson.warmup}</div><div class="insight"><strong>メモ</strong>1行だけでもよいので自分の考えを残そう</div></div></div>
    </div>`;
}

app.addEventListener('submit', (e) => {
  if (e.target.id === 'login-form') {
    e.preventDefault();
    login(e.target.username.value.trim(), e.target.password.value.trim());
  }
});

app.addEventListener('click', (e) => {
  const actionEl = e.target.closest('[data-action], [data-quick], [data-open], [data-filter], [data-tab-switch], [data-mark-complete], [data-answer], [data-submit-quiz], [data-student-detail], [data-close-lesson]');
  if (!actionEl) return;


  if (actionEl.dataset.quick) return login(actionEl.dataset.quick, 'demo123');
  if (actionEl.dataset.action === 'logout') return logout();
  if (actionEl.dataset.action === 'reset') return resetDemo();
  if (actionEl.dataset.action === 'home') { session.role = null; session.userId = null; session.lessonModal = null; return render(); }
  if (actionEl.dataset.action === 'teacher-text') {
    const next = lessons.find(l => state.students.some(s => !lessonDone(s,l.id))) || lessons[0];
    return alert(`第${next.id}回 ${next.title}

導入の問い: ${next.warmup}

先生用テキスト: ${next.teacherText}`);
  }
  if (actionEl.dataset.action === 'open-review') {
    const s = getStudent(session.userId);
    const review = lessons.find(l => lessonDone(s,l.id) && (s.quizScores[l.id] || 0) < 70) || lessons[0];
    return openLesson(review.id, 'review');
  }
  if (actionEl.dataset.open) return openLesson(Number(actionEl.dataset.open), actionEl.dataset.tab || 'learn');
  if (actionEl.dataset.filter) { session.filter = actionEl.dataset.filter; return render(); }
  if (actionEl.dataset.tabSwitch) { session.activeTab = actionEl.dataset.tabSwitch; return render(); }
  if (actionEl.dataset.markComplete) { markDone(session.userId, Number(actionEl.dataset.markComplete)); alert('この回を完了として保存しました。ダッシュボードにも反映されます。'); return render(); }
  if (actionEl.dataset.answer) {
    const [qIdx, cIdx] = actionEl.dataset.answer.split(':').map(Number);
    session.quizAnswers[qIdx] = cIdx;
    session.quizSubmitted = false;
    return render();
  }
  if (actionEl.dataset.submitQuiz) {
    const lesson = lessons.find(l => l.id === Number(actionEl.dataset.submitQuiz));
    const raw = lesson.quiz.reduce((sum, q, idx) => sum + (session.quizAnswers[idx] === q.answer ? 1 : 0), 0);
    const score = Math.round((raw / lesson.quiz.length) * 100);
    saveQuiz(session.userId, lesson.id, score);
    session.quizSubmitted = true;
    session.activeTab = 'quiz';
    return render();
  }
  if (actionEl.dataset.studentDetail) { session.lessonModal = `student:${actionEl.dataset.studentDetail}`; return render(); }
  if (actionEl.dataset.closeLesson !== undefined) return closeLesson();
});

render();
