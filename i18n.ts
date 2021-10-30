import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const translation = i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        addNote: 'Add Note',
        uploadNote: 'Upload Note',
        edit: 'Edit',
        delete: 'Delete',
        download: 'Download',
        deleteDialogHeader: 'Do you really want to delete this note?',
        deleteDialogText: "This note will be deleted forever and you can't recover it.",
        deleteDialogYes: 'Yes',
        deleteDialogNo: 'No',
        note: 'Note',
        notFound: 'Note Not Found',
        indexAddNote: 'Add Note',
        indexSelectNote: 'Select Note',
        indexUploadNote: 'Upload Note',
        indexMessage: 'from the sidebar or',
        saved: 'Saved!',
      },
    },
    ru: {
      translation: {
        addNote: 'Создать',
        uploadNote: 'Загрузить',
        edit: 'Изменить',
        delete: 'Удалить',
        download: 'Скачать',
        deleteDialogHeader: 'Вы хотите удалить эту записку?',
        deleteDialogText: 'Записка будет удалена. Вы не сможете восстановить её',
        deleteDialogYes: 'Да',
        deleteDialogNo: 'Нет',
        note: 'Записка',
        notFound: 'Записка не найдена',
        indexAddNote: 'Создайте Записку',
        indexSelectNote: 'Выберите Записку',
        indexUploadNote: 'Загрузите Записку',
        indexMessage: 'для редактирования или',
        saved: 'Сохранено',
      },
    },
  },
});