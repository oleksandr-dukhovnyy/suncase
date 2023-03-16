# adaptive-css

Мнималистическая scss библиотека для работы с медиазапросами с возможностью указывать свои медиа брейкпоинты.
Отлично подойдёт для mobile-first разработки.
Данная библиотека - это просто набор полезных миксинов. Сборку и обработку (минимизация, разделение на чанки, объединение одинаковых медиазапросов) вам нужно настраивать самостоятельно в зависимости от особенностей вашего проекта.

## Instalation

### npm

```bash
npm i adaptive-css
```

### yarn

```bash
yarn add adaptive-css
```

## Default breakpoints

| breakpoint name | screen width size |
| --------------- | ----------------- |
| xs              | >0px              |
| sm              | >576px            |
| md              | >768px            |
| lg              | >992px            |
| xl              | >1200px           |
| xxl             | >1900px           |

## Usage

### Default usage

Следующий **scss**:

```scss
@import 'adaptive-css';

body {
  background-color: yellowgreen;

  @include _media-up(md) {
    background-color: green;
  }

  @include _media-up(xl) {
    background-color: red;
  }
}
```

Сконвертируются в такой **css**:

```css
body {
  background-color: yellowgreen;
}

@media (min-width: 768px) {
  body {
    background-color: green;
  }
}

@media (min-width: 1200px) {
  body {
    background-color: red;
  }
}
```

### Uage with custom breakpoints list

Можно устанавливать свой список брейкпоинтов.
Наиболее простой способ - это создание миксина-обёртки.

```scss
@import 'adaptive-css';

$list: (
  mobile: 0,
  tablet: 700px,
  desktop: 1400px,
);

@mixin media-up($name) {
  @include _media-up($name, $list) {
    @content;
  }
}

body {
  background-color: yellowgreen;

  @include media-up(tablet) {
    background-color: green;
  }

  @include media-up(desktop) {
    background-color: red;
  }
}
```

В результате получим это:

```css
body {
  background-color: yellowgreen;
}

@media (min-width: 768px) {
  body {
    background-color: green;
  }
}

@media (min-width: 1200px) {
  body {
    background-color: red;
  }
}
```

#### Пару слов про список брейкпоинтов

Список брейкпоинтов, который используется по-умолчанию - это список, взятый из bootstrap, который, де-факто, можно считать стандартным в данный момент.
Со временем расширения экранов в веб будут менятся. Будут требоваться новые брейкпоинты, а старые потребуют корректировки.
Изменение параметров брейкпоинтов по-умолчанию - это обратно несовместимые изменения. Вносите их аккуратно.
