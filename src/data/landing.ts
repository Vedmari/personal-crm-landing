// All landing texts, word for word from design/copy/landing-text.md.
// Change them only with the owner's consent.
// typographAll() adds non-breaking spaces so lines break correctly; see typography.ts.
import { typographAll } from "./typography";

// A heading with one italic accent: before + <i>accent</i> + after.
export type AccentedText = {
  before: string;
  accent?: string;
  after?: string;
};

export const meta = {
  title: "Личная CRM — каждый знакомый с историей",
  description:
    "Личная CRM для людей, которых вы знаете лично. Кто это, откуда знакомы, о чём говорили и о чём договорились — в одной карточке.",
};

export const brand = "Личная CRM";

export const ctaLabel = "Открыть приложение";

export const hero = typographAll({
  title: {
    before: "Каждый знакомый — ",
    accent: "с историей",
    after: ", а не просто номером",
  } satisfies AccentedText,
  subtitle:
    "Личная CRM для людей, которых вы знаете лично. Кто это, откуда знакомы, о чём говорили и о чём договорились — в одной карточке.",
});

// Sheet dates are decorative: part of the "pages from different days" concept.
export const problem = typographAll({
  date: "среда · 21 октября",
  title: { before: "Номер есть, а человека не помните" } satisfies AccentedText,
  items: [
    "«Саша ремонт», «Ольга (подруга Лены?)», «Дмитрий конф» — номера сохранены, но кто все эти люди?",
    "Познакомились на конференции, а через месяц не помните, о чём говорили.",
    "Обещали созвониться в пятницу — и забыли.",
    "Всё, что вы знаете о человеке, разбросано по чатам, заметкам в телефоне и собственной памяти.",
  ],
});

export const solution = typographAll({
  date: "пятница · 23 октября",
  title: { before: "За каждым именем — ", accent: "история" } satisfies AccentedText,
  subtitle: "Личная CRM хранит не только контакты, но и всё, что между вами было.",
  features: [
    {
      title: "Кто это",
      text: "Имя, кто это, откуда знакомы, телефон и почта. Обязательно только имя — остальное допишете потом.",
    },
    {
      title: "История разговоров",
      text: "После встречи — пара строк в ленту заметок. Каждая с датой, новые сверху, старые не стираются.",
    },
    {
      title: "О чём договорились",
      text: "Отдельное поле в карточке — обещания всегда на виду и не теряются среди заметок.",
    },
    {
      title: "Быстрый поиск",
      text: "По имени или по тому, кто это: «анна ветеринар» найдёт нужную Анну. Слова — в любом порядке.",
    },
  ],
});

export const benefits = typographAll({
  date: "воскресенье · 25 октября",
  title: { before: "Что изменится" } satisfies AccentedText,
  items: [
    {
      lead: "Вы помните человека, а не только номер.",
      text: "Перед звонком открываете карточку — и вся история перед глазами.",
    },
    {
      lead: "Разговор продолжается с того места, где остановились.",
      text: "Спрашиваете, как прошёл переезд, — потому что помните, что он был.",
    },
    {
      lead: "Обещания не теряются.",
      text: "Всё, о чём договорились, записано и на виду.",
    },
    {
      lead: "Нужный человек находится, даже если забыли имя.",
      text: "Достаточно помнить, кто он: «стоматолог», «сосед», «риелтор».",
    },
  ],
});

export const callToAction = typographAll({
  title: { before: "Превратите первый номер в ", accent: "историю" } satisfies AccentedText,
  note: "Вспомните, с кем говорили сегодня, и заведите первую карточку.",
});
