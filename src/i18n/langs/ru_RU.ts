export default {
  preload: {
    loading: 'Загрузка',
    updating: 'Обновление',
  },
  appearance: {
    theme_changed: 'Тема изменена',
  },
  throws: {
    unsupported_platform: 'Текущая система не поддерживается',
    unsupported_arch: 'Архитектура {arch} не поддерживается',
    invalid_jdk_version: 'Некорректная версия JDK',
  },
  minecraft: {
    versions: {
      not_found: 'Ничего не найдено',
      fetching_versions: 'Подождите немного, возможно скоро всё будет',
      release_type: 'Релиз',
      snapshot_type: 'Снапшот',
      latest_type: 'Последняя',
      snapshots: 'Снапшоты',
    },
    install: {
      install_failed: 'Установка не удалась',
      jvm_install_failed: 'Не удалось установить Java',
      minecraft_assets_download_failed: 'Не удалось установить Minecraft',
      unpack_natives_failed: 'Не удалось распаковать некоторые библиотеки',
      populate_manifest_failed: 'Не удалось обновить информацию о ресурсах версии',
      network_error: 'Ошибка сети. Проверьте подключение к интернету',
      fetch_manifest_exception: 'Не удалось загрузить файл версии',
    },
    instance: {
      name: 'Название',
      name_required: 'Название обязательно',
      name_too_long: 'Слишком длинное название',
      name_invalid_pattern: 'Название содержит недопустимые символы',
      window_size: 'Размер окна',
      jvm_args: 'JVM аргументы',
      invalid_args_string: 'Некорректная строка аргументов',
      minecraft_args: 'Minecraft аргументы',
      save: 'Сохранить',
      create: 'Создать',
      instance_fixed: 'Экземпляр будет переустановлен при следующем запуске',
      are_you_sure: 'Вы уверены?',
      are_you_want_to_delete:
        'Вы действительно хотите удалить экземпляр игры? Это действие удалит только профиль экземпляра. Для полного удаления игровых данных выберите соответсвующее действие.',
      full_delete: 'Удалить полностью',
      cancel: 'Отмена',
      remove: 'Удалить',
      already_removed: 'Текущего каталога уже не существует',
    },
    launch: {
      launch_failed: 'Запуск не удался',
      minecraft_crashed: 'Minecraft закрылся с ошибкой',
      no_compatible_jdks: 'Отсутствуют совместимые JDK. Попробуйте исправить экземпляр и повторить установку',
      launch_requires_installation: 'Запуск требует фактической установки. Попробуйте исправить экземпляр и повторить',
      missing_jvm_executable: 'Отсутствует исполняемый файл Java',
      unable_to_launch_more_once: 'Невозможно запустить более одного процесса на экземпляр',
    },
  },
  journal: {
    no_logs: 'Нет логов',
  },
  play: {
    nickname: 'Никнейм',
  },
  settings: {
    general: 'Общие настройки',
    path_to_gamedir: 'Путь к игровым данным',
    appearance: 'Внешний вид',
    lang: 'Язык',
    theme: 'Тема',
    jdks: 'Java Runtimes',
    no_jdks: 'Java не установлена',
  },
  update: {
    available: 'Доступно обновление {version}',
    description: 'Установите последнюю версию приложения {version}, чтобы продолжить',
    do: 'Обновить',
    cancel: 'Отмена',
  },
  other: {
    launcher_crashed:
      'Лаунчер упал с критической ошибкой. Подождите пока составляется отчёт об ошибке, после чего лаунчер перезагрузится. Попытайтесь понять, что вызвало ошибку и сообщите об этом разработчику или администрации',
  },
}
