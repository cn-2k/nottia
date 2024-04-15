<template>
  <div class="mx-auto my-6 max-w-6xl space-y-4 px-6 lg:my-12 lg:space-y-6 lg:px-0">
    <div class="flex gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="rgb(100 116 139 / 0.4)"
          d="M7 20V8.975q0-.825.6-1.4T9.025 7H20q.825 0 1.413.587T22 9v8l-5 5H9q-.825 0-1.412-.587T7 20M2.025 6.25q-.15-.825.325-1.487t1.3-.813L14.5 2.025q.825-.15 1.488.325t.812 1.3L17.05 5H15l-.175-1L4 5.925l1 5.65v6.975q-.4-.225-.687-.6t-.363-.85zM9 9v11h7v-4h4V9zm5.5 5.5" />
      </svg>
      <span class="text-lg font-bold tracking-wide text-slate-500/40">Nottia (based on NLW Expert)</span>
    </div>
    <form class="w-full">
      <input v-model="search" type="text" placeholder="Search in your notes..."
        class="w-full bg-transparent text-xl font-semibold tracking-tight outline-none placeholder:text-slate-500 lg:text-3xl" />
    </form>

    <div class="h-px bg-slate-700"></div>

    <div v-auto-animate
      class="grid h-[75vh] auto-rows-[250px] grid-cols-1 gap-6 overflow-y-auto overflow-x-hidden py-4 pl-2 pr-3 scrollbar scrollbar-track-transparent scrollbar-thumb-slate-300/20 lg:h-[700px] lg:grid-cols-3">
      <ClientOnly>
        <NewNoteCard @on-note-created="onNoteCreated" />
        <NoteCard v-for="note in filteredNotes" :key="note.id" :note="note" @on-note-deleted="onNoteDeleted" />
      </ClientOnly>
    </div>
  </div>

  <Toaster rich-colors />
</template>

<script setup lang="ts">
import { Toaster, toast } from "vue-sonner";
import { vAutoAnimate } from "@formkit/auto-animate";
import { useStorage } from '@vueuse/core'

interface NoteProps {
  id: string;
  date: Date;
  content: string;
}

const search = ref<string>("");
const notes = ref<NoteProps[]>([]);

useStorage('notes', notes)

function onNoteCreated(content: string) {
  const newNote = {
    id: crypto.randomUUID(),
    date: new Date(),
    content,
  };

  const notesArray = [newNote, ...notes.value];
  notes.value = notesArray;
}

function onNoteDeleted(id: string) {
  const notesArray = notes.value.filter((note) => {
    return note.id !== id;
  });

  notes.value = notesArray;

  toast.success("Note removed with success!");
}

const filteredNotes = computed(() => {
  return search.value === ""
    ? notes.value
    : notes.value.filter((note) =>
      note.content.toLowerCase().includes(search.value.toLowerCase()),
    );
});

useSeoMeta({
  title: 'Nottia',
  ogTitle: 'Nottia',

  description: 'Create and register your notes with AI Assistance!',
  ogDescription: 'Create and register your notes with AI Assistance!',
})

defineOgImageComponent('Pergel', {
  headline: true,
  title: 'Nottia',
  description: 'Create and register your notes with AI Assistance!',
})
</script>
