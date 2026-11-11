import type { Locale } from '../locales';
const en = {
 brand:'Independent digital studio', home:'dilumio home',skip:'Skip to content',navigation:'Main navigation',footer:'Footer navigation',language:'Page language',
 products:'Products',journal:'Journal',people:'People',contact:'Contact',company:'Company details',english:'English',
 writing:'Stories behind the product',writingEmpty:'Product stories are being prepared.',visitJournal:'Visit the journal',
};
const ru: typeof en = {
 brand:'Независимая цифровая студия',home:'На главную dilumio',skip:'Перейти к содержанию',navigation:'Основная навигация',footer:'Ссылки в подвале',language:'Язык страницы',
 products:'Продукты',journal:'Журнал',people:'О нас',contact:'Контакты',company:'Реквизиты',english:'На английском',
 writing:'Истории о продукте',writingEmpty:'Мы готовим материалы о продукте.',visitJournal:'Перейти в журнал',
};
export const ui: Record<Locale, typeof en> = {en,ru};
