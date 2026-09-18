import RequestForm from "@/components/RequestForm";

const NAV = [
  { href: "#vitrina", label: "Витрина дела" },
  { href: "#osnovaniya", label: "Основания для контакта" },
  { href: "#zapros", label: "Первичный запрос" },
];

const FACTS = [
  { key: "Работа", value: "«Поместье в горах», холст, масло" },
  { key: "Рама", value: "родная, с двумя следами крепления" },
  { key: "Ярлык", value: "инвентарный, читается частично" },
  { key: "Каталог", value: "частный, работа указана без владельца" },
];

const GROUNDS = [
  {
    title: "Вы видели работу раньше",
    text: "Город, собрание, ориентировочные годы — этого уже достаточно, чтобы начать сверку.",
  },
  {
    title: "У вас сохранился документ",
    text: "Письмо, счёт, дарственная или страница частного каталога с этой работой.",
  },
  {
    title: "У вас сохранилась фотография",
    text: "Снимок в интерьере, на выставке или в мастерской — качество значения не имеет.",
  },
  {
    title: "Вы узнали работу по ярлыку",
    text: "Номер на раме, надпись на подрамнике или пометка на обороте холста.",
  },
];

const STEPS = [
  {
    title: "Читаем запрос",
    text: "Запрос читает человек, а не робот: в рабочие дни — в течение дня.",
  },
  {
    title: "Сверяем с делом",
    text: "Сопоставляем названное с инвентарным ярлыком и страницей частного каталога.",
  },
  {
    title: "Звоним и говорим прямо",
    text: "Что подтвердилось, что нет и какое вознаграждение за наводку возможно.",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#zapros">
        Перейти к первичному запросу
      </a>

      <header className="site-header">
        <div className="shell site-header__inner">
          <a className="brand" href="#vitrina">
            <span className="brand__mark" aria-hidden="true">
              ЛК
            </span>
            <span className="brand__text">
              <span className="brand__title">Закрытая галерея</span>
              <span className="brand__note">приём первичных обращений</span>
            </span>
          </a>

          <nav className="site-nav" aria-label="Секции страницы">
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="section section--hero" id="vitrina" aria-labelledby="vitrina-title">
          <div className="shell showcase">
            <div className="stack">
              <div className="section__head">
                <p className="eyebrow">Витрина дела</p>
                <h1 className="section__title" id="vitrina-title">
                  Картина «Поместье в горах» без полной цепочки документов
                </h1>
                <p className="lead">
                  Закрытая галерея принимает первичные обращения по делу о картине без
                  происхождения. Показываем работу сдержанно: нам нужны не догадки и не оценки,
                  а факты о том, где она находилась и у кого.
                </p>
              </div>

              <p>
                Ниже — то немногое, что мы готовы показать до разговора. Остальное — инвентарный
                номер, страница частного каталога, следы крепления на подрамнике — обсуждаем по
                телефону.
              </p>

              <ul className="facts">
                {FACTS.map((fact) => (
                  <li className="fact" key={fact.key}>
                    <p className="fact__key">{fact.key}</p>
                    <p className="fact__value">{fact.value}</p>
                  </li>
                ))}
              </ul>

              <p className="note">
                Мы не публикуем историю владения и не обсуждаем цену работы вслух. Внимание — к
                фактам происхождения.
              </p>

              <a className="link" href="#zapros">
                Перейти к первичному запросу
                <span className="link__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>

            <figure className="plate">
              <div className="plate__frame">
                <span className="plate__tag">фрагмент</span>
              </div>
              <figcaption className="plate__caption">
                <span className="plate__title">«Поместье в горах»</span>
                <span className="plate__meta">
                  Холст, масло. Показан фрагмент: полное изображение и оборот — по запросу.
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="section" id="osnovaniya" aria-labelledby="osnovaniya-title">
          <div className="shell">
            <div className="section__head">
              <p className="eyebrow">Основания для контакта</p>
              <h2 className="section__title" id="osnovaniya-title">
                Когда есть смысл писать
              </h2>
              <p className="lead">
                Достаточно одного совпадения. Оценки, предположения и «кажется, я это видел» тоже
                подойдут — проверяем всё, пока не найдётся подтверждение.
              </p>
            </div>

            <ul className="grounds">
              {GROUNDS.map((ground, index) => (
                <li className="ground" key={ground.title}>
                  <span className="ground__index">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="ground__title">{ground.title}</h3>
                  <p className="ground__text">{ground.text}</p>
                  <p className="ground__cta">
                    <a className="link" href="#zapros">
                      Оставить первичный запрос
                      <span className="link__arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="zapros" aria-labelledby="zapros-title">
          <div className="shell">
            <div className="section__head">
              <p className="eyebrow">Первичный запрос</p>
              <h2 className="section__title" id="zapros-title">
                Три поля и один разговор
              </h2>
              <p className="lead">
                Заполните форму — мы позвоним по указанному телефону. Материалы дела и фотографии
                отправляем после короткого разговора.
              </p>
            </div>

            <div className="request">
              <div className="card">
                <h3 className="card__title">Первичный запрос по делу</h3>
                <p className="card__lead">
                  Поля со звёздочкой обязательны. Для первого обращения больше ничего не нужно.
                </p>
                <RequestForm />
              </div>

              <aside className="aside" aria-label="Что происходит после отправки">
                <div className="card">
                  <h3 className="card__title">Что происходит после отправки</h3>
                  <ul className="steps">
                    {STEPS.map((step, index) => (
                      <li className="step" key={step.title}>
                        <span className="step__num" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="step__title">{step.title}</p>
                          <p className="step__text">{step.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="note">
                  Публикаций по этому делу не делаем. Всё, что вы сообщите, остаётся между нами до
                  вашего согласия.
                </p>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell site-footer__inner">
          <span>Закрытая галерея · приём первичных обращений по делу</span>
        </div>
      </footer>
    </>
  );
}

