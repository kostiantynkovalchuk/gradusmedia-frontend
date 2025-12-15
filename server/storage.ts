import { type User, type InsertUser, type Article, type InsertArticle, type Category, type ArticlesResponse, type ArticleDetailResponse, type CategoriesResponse, type SearchResponse } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getArticles(limit?: number, offset?: number, category?: string): Promise<ArticlesResponse>;
  getArticleBySlug(slug: string): Promise<ArticleDetailResponse | undefined>;
  searchArticles(query: string, limit?: number): Promise<SearchResponse>;
  getCategories(): Promise<CategoriesResponse>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private articles: Map<string, Article>;
  private categories: Map<string, Category>;

  constructor() {
    this.users = new Map();
    this.articles = new Map();
    this.categories = new Map();
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleCategories: Category[] = [
      { id: randomUUID(), name: "Новини", slug: "news", count: 5 },
      { id: randomUUID(), name: "Огляди", slug: "reviews", count: 3 },
      { id: randomUUID(), name: "Тренди", slug: "trends", count: 4 },
    ];

    sampleCategories.forEach(cat => this.categories.set(cat.id, cat));

    const sampleArticles: Omit<Article, "id">[] = [
      {
        slug: "premium-whisky-trends-2024",
        title: "Тренди преміум віскі 2024: що обирають українські бари",
        excerpt: "Аналіз найпопулярніших сортів віскі в українських барах та ресторанах. Дізнайтеся, які бренди очолюють рейтинги та чому.",
        content: `<p>Ринок преміум віскі в Україні продовжує зростати, незважаючи на економічні виклики. За останній рік продажі односолодового віскі зросли на 23%, а бленди преміум-класу — на 18%.</p>
        
<h2>Топ-5 брендів у барах України</h2>

<p>За даними нашого дослідження, найпопулярнішими брендами серед українських барів стали:</p>

<ol>
<li>Glenfiddich — класика, яка ніколи не виходить з моди</li>
<li>Macallan — преміум вибір для особливих випадків</li>
<li>Jameson — ірландський фаворит</li>
<li>Jack Daniel's — американська легенда</li>
<li>Chivas Regal — бленд для цінителів</li>
</ol>

<blockquote>Український споживач стає все більш вибагливим. Ми бачимо зростання попиту на односолодові віскі віком від 12 років — каже експерт галузі.</blockquote>

<h2>Прогноз на 2025 рік</h2>

<p>Експерти прогнозують подальше зростання ринку преміум напоїв. Особливо помітним буде тренд на японський віскі та крафтові дистилерії.</p>`,
        imageUrl: "https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=1200",
        category: "Тренди",
        publishedAt: new Date("2024-12-15T10:00:00Z"),
        readTime: 7,
        views: 1234,
        author: "Gradus AI",
        tags: ["whisky", "trends", "horeca", "premium"],
      },
      {
        slug: "bar-inventory-management-tips",
        title: "10 секретів ефективного управління інвентарем бару",
        excerpt: "Практичні поради для барменів та менеджерів закладів. Як оптимізувати запаси та зменшити втрати.",
        content: `<p>Ефективне управління інвентарем — ключ до прибутковості будь-якого бару. Ми зібрали найкращі практики від досвідчених менеджерів.</p>

<h2>1. Регулярний аудит</h2>
<p>Проводьте інвентаризацію щотижня. Це допоможе виявити розбіжності та запобігти крадіжкам.</p>

<h2>2. FIFO система</h2>
<p>First In, First Out — золоте правило для алкогольних напоїв. Завжди використовуйте старіші запаси першими.</p>

<h2>3. Оптимальний рівень запасів</h2>
<p>Визначте мінімальний та максимальний рівень для кожної позиції. Автоматизуйте замовлення.</p>`,
        imageUrl: "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=1200",
        category: "Огляди",
        publishedAt: new Date("2024-12-14T14:30:00Z"),
        readTime: 5,
        views: 856,
        author: "Gradus AI",
        tags: ["management", "bar", "inventory", "tips"],
      },
      {
        slug: "craft-cocktails-revolution",
        title: "Революція крафтових коктейлів: нові смаки для HoReCa",
        excerpt: "Як крафтові коктейлі змінюють індустрію гостинності та що пропонувати гостям у 2025 році.",
        content: `<p>Крафтові коктейлі стали справжнім трендом останніх років. Все більше закладів відмовляються від стандартних рецептів на користь авторських напоїв.</p>

<h2>Популярні інгредієнти</h2>
<p>Серед найпопулярніших інгредієнтів для крафтових коктейлів виділяються:</p>
<ul>
<li>Домашні настоянки</li>
<li>Свіжі трави та спеції</li>
<li>Локальні фрукти та ягоди</li>
<li>Незвичайні біттери</li>
</ul>`,
        imageUrl: "https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=1200",
        category: "Тренди",
        publishedAt: new Date("2024-12-13T09:00:00Z"),
        readTime: 6,
        views: 1567,
        author: "Gradus AI",
        tags: ["cocktails", "craft", "trends", "recipes"],
      },
      {
        slug: "wine-pairing-guide-restaurants",
        title: "Гід з підбору вина для ресторанів: від теорії до практики",
        excerpt: "Повний посібник для сомельє та офіціантів. Як правильно підібрати вино до страв та вразити гостей.",
        content: `<p>Правильний підбір вина може перетворити звичайну вечерю на незабутній досвід. Розглянемо основні принципи пейрингу.</p>

<h2>Базові правила</h2>
<p>Класичні поєднання ніколи не підводять: червоне до м'яса, біле до риби. Але сучасна кухня дозволяє експериментувати.</p>`,
        imageUrl: "https://images.pexels.com/photos/1123260/pexels-photo-1123260.jpeg?auto=compress&cs=tinysrgb&w=1200",
        category: "Огляди",
        publishedAt: new Date("2024-12-12T16:00:00Z"),
        readTime: 8,
        views: 723,
        author: "Gradus AI",
        tags: ["wine", "pairing", "restaurant", "guide"],
      },
      {
        slug: "hotel-bar-design-trends",
        title: "Дизайн готельних барів: тренди 2025 року",
        excerpt: "Огляд найстильніших готельних барів світу та інсайти для українських готелів.",
        content: `<p>Готельний бар — це візитна картка закладу. Сучасний дизайн поєднує комфорт з унікальною атмосферою.</p>

<h2>Ключові тренди</h2>
<ul>
<li>Натуральні матеріали та текстури</li>
<li>Приглушене освітлення з акцентами</li>
<li>Відкриті полиці з колекційним алкоголем</li>
<li>Зони для приватних розмов</li>
</ul>`,
        imageUrl: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1200",
        category: "Новини",
        publishedAt: new Date("2024-12-11T11:30:00Z"),
        readTime: 5,
        views: 945,
        author: "Gradus AI",
        tags: ["design", "hotel", "bar", "trends"],
      },
      {
        slug: "ukrainian-craft-beer-scene",
        title: "Український крафт: як локальні пивоварні завойовують ринок",
        excerpt: "Історії успіху українських крафтових пивоварень та їх місце в HoReCa секторі.",
        content: `<p>Крафтове пиво в Україні переживає справжній бум. За останні 5 років кількість мікропивоварень зросла втричі.</p>

<h2>Лідери ринку</h2>
<p>Серед найуспішніших українських крафтових брендів виділяються виробники з Києва, Львова та Харкова.</p>`,
        imageUrl: "https://images.pexels.com/photos/1267360/pexels-photo-1267360.jpeg?auto=compress&cs=tinysrgb&w=1200",
        category: "Новини",
        publishedAt: new Date("2024-12-10T08:00:00Z"),
        readTime: 6,
        views: 1102,
        author: "Gradus AI",
        tags: ["beer", "craft", "ukrainian", "brewery"],
      },
      {
        slug: "bar-staff-training-essentials",
        title: "Навчання персоналу бару: що потрібно знати кожному барменну",
        excerpt: "Ключові навички та знання для успішної кар'єри в барній індустрії.",
        content: `<p>Професійний бармен — це більше, ніж просто людина, яка змішує напої. Це артист, психолог та підприємець в одній особі.</p>

<h2>Обов'язкові знання</h2>
<ul>
<li>Техніки змішування коктейлів</li>
<li>Знання про алкогольні напої</li>
<li>Навички роботи з клієнтами</li>
<li>Основи бухгалтерії бару</li>
</ul>`,
        imageUrl: "https://images.pexels.com/photos/2531184/pexels-photo-2531184.jpeg?auto=compress&cs=tinysrgb&w=1200",
        category: "Огляди",
        publishedAt: new Date("2024-12-09T13:00:00Z"),
        readTime: 7,
        views: 634,
        author: "Gradus AI",
        tags: ["training", "staff", "bartender", "skills"],
      },
      {
        slug: "sustainability-in-hospitality",
        title: "Екологічність в гостинності: тренд чи необхідність?",
        excerpt: "Як заклади HoReCa впроваджують екологічні практики та чому це важливо для бізнесу.",
        content: `<p>Екологічна свідомість споживачів зростає. Заклади, які впроваджують сталі практики, отримують конкурентну перевагу.</p>

<h2>Практичні кроки</h2>
<p>Від переробки скла до використання локальних продуктів — кожен крок має значення.</p>`,
        imageUrl: "https://images.pexels.com/photos/1055058/pexels-photo-1055058.jpeg?auto=compress&cs=tinysrgb&w=1200",
        category: "Тренди",
        publishedAt: new Date("2024-12-08T10:30:00Z"),
        readTime: 5,
        views: 478,
        author: "Gradus AI",
        tags: ["sustainability", "eco", "hospitality", "green"],
      },
      {
        slug: "coffee-trends-horeca-2025",
        title: "Кавові тренди для HoReCa: що пропонувати гостям у 2025",
        excerpt: "Від specialty coffee до незвичайних подач — все про майбутнє кави в закладах гостинності.",
        content: `<p>Кава залишається найпопулярнішим напоєм у світі. Але очікування споживачів постійно зростають.</p>

<h2>Топ-тренди</h2>
<ul>
<li>Single origin кава</li>
<li>Альтернативні методи заварювання</li>
<li>Кавові коктейлі</li>
<li>Рослинне молоко</li>
</ul>`,
        imageUrl: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1200",
        category: "Тренди",
        publishedAt: new Date("2024-12-07T15:00:00Z"),
        readTime: 4,
        views: 892,
        author: "Gradus AI",
        tags: ["coffee", "trends", "specialty", "horeca"],
      },
      {
        slug: "restaurant-tech-innovations",
        title: "Технологічні інновації в ресторанному бізнесі",
        excerpt: "Огляд найновіших технологій, які змінюють індустрію гостинності в Україні та світі.",
        content: `<p>Технології революціонізують ресторанний бізнес. Від QR-меню до AI-систем управління — майбутнє вже тут.</p>

<h2>Інновації в дії</h2>
<p>Українські ресторани активно впроваджують цифрові рішення для покращення сервісу.</p>`,
        imageUrl: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1200",
        category: "Новини",
        publishedAt: new Date("2024-12-06T09:00:00Z"),
        readTime: 6,
        views: 567,
        author: "Gradus AI",
        tags: ["technology", "restaurant", "innovation", "digital"],
      },
    ];

    sampleArticles.forEach(article => {
      const id = randomUUID();
      this.articles.set(id, { ...article, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getArticles(limit: number = 20, offset: number = 0, category?: string): Promise<ArticlesResponse> {
    let articles = Array.from(this.articles.values());
    
    if (category) {
      articles = articles.filter(a => a.category.toLowerCase() === category.toLowerCase());
    }
    
    articles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    const total = articles.length;
    const paginatedArticles = articles.slice(offset, offset + limit);
    
    return {
      articles: paginatedArticles,
      total,
      hasMore: offset + limit < total,
    };
  }

  async getArticleBySlug(slug: string): Promise<ArticleDetailResponse | undefined> {
    const article = Array.from(this.articles.values()).find(a => a.slug === slug);
    
    if (!article) {
      return undefined;
    }

    const allArticles = Array.from(this.articles.values())
      .filter(a => a.id !== article.id && a.category === article.category)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    if (allArticles.length < 3) {
      const moreArticles = Array.from(this.articles.values())
        .filter(a => a.id !== article.id && !allArticles.find(ra => ra.id === a.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, 3 - allArticles.length);
      allArticles.push(...moreArticles);
    }

    return {
      article,
      relatedArticles: allArticles,
    };
  }

  async searchArticles(query: string, limit: number = 10): Promise<SearchResponse> {
    const lowerQuery = query.toLowerCase();
    const articles = Array.from(this.articles.values())
      .filter(a => 
        a.title.toLowerCase().includes(lowerQuery) ||
        a.excerpt.toLowerCase().includes(lowerQuery) ||
        a.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
      .sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      .slice(0, limit);

    return {
      articles,
      total: articles.length,
      query,
    };
  }

  async getCategories(): Promise<CategoriesResponse> {
    const categoryCounts = new Map<string, number>();
    
    Array.from(this.articles.values()).forEach(article => {
      const count = categoryCounts.get(article.category) || 0;
      categoryCounts.set(article.category, count + 1);
    });

    const categories = Array.from(this.categories.values()).map(cat => ({
      ...cat,
      count: categoryCounts.get(cat.name) || 0,
    }));

    return { categories };
  }
}

export const storage = new MemStorage();
