<template>
  <ScDialog :open="isDialogOpen" @update:open="isDialogOpen = !isDialogOpen">
    <ScDialogTrigger
      class="flex flex-col gap-3 overflow-hidden rounded-md bg-slate-700 p-5 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400"
    >
      <span class="text-sm font-medium text-slate-200"> Add note </span>
      <p class="break-all text-sm leading-6 text-slate-400">
        Create your notes by yourself or with <strong>AI asssistance</strong>!
      </p>
      <p class="text-xs font-medium text-slate-400/50">
        Markdown is supported!
      </p>
    </ScDialogTrigger>
    <ScDialogContent
      class="flex h-[60vh] min-h-[400px] w-full max-w-[640px] flex-col overflow-hidden rounded-md border-transparent bg-slate-700 p-0 outline-none"
      @close-auto-focus="handleClose"
      @interact-outside="(e) => e.preventDefault()"
    >
      <ScDialogHeader class="px-5 pt-5">
        <ScDialogTitle>
          <span class="text-sm font-medium text-slate-300">
            Create a new note
          </span></ScDialogTitle
        >
      </ScDialogHeader>
      <div v-if="shouldShowOnboarding" class="flex flex-1 flex-col gap-3 p-5">
        <p class="text-sm leading-6 text-slate-400">
          Start writing your note
          <button
            class="font-medium text-lime-400 hover:underline"
            @click="handleStartEditor"
          >
            clicking here.
          </button>
        </p>
      </div>
      <ScContextMenu v-if="!shouldShowOnboarding">
        <ScContextMenuTrigger
          class="flex flex-1 flex-col overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300/20"
        >
          <ScContextMenuContent class="w-60 lg:w-[400px]">
            <div v-focus class="mb-2 p-2">
              <textarea
                id="message"
                v-model="prompt"
                placeholder="The llama is waiting for you, enter your prompt..."
                rows="3"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700 outline-none ring-0 focus:outline-none"
                @keydown.stop
              ></textarea>
            </div>
            <ScContextMenuItem
              inset
              :disabled="!prompt"
              class="cursor-pointer"
              @click="handleTextGenerate"
            >
              Send message
              <ScContextMenuShortcut>🦙</ScContextMenuShortcut>
            </ScContextMenuItem>
            <ScContextMenuSub>
              <ScContextMenuSubTrigger inset>
                More Tools
              </ScContextMenuSubTrigger>
              <ScContextMenuSubContent class="w-48">
                <ScContextMenuItem
                  inset
                  :disabled="!prompt"
                  class="cursor-pointer"
                  @click="handleImageGenerate(prompt)"
                >
                  Generate a image
                  <ScContextMenuShortcut>🦙</ScContextMenuShortcut>
                </ScContextMenuItem>
              </ScContextMenuSubContent>
            </ScContextMenuSub>
          </ScContextMenuContent>
          <p
            v-if="isImageGenerating"
            class="animate-pulse text-center text-sm text-slate-400"
          >
            Generating image, please wait...
          </p>
          <img
            v-if="imageUrl"
            :src="imageUrl"
            alt="image"
            srcset=""
            class="h-auto w-full object-cover md:h-48"
          />
          <div class="flex flex-1 flex-col gap-3 p-5">
            <textarea
              v-if="!shouldShowOnboarding && !isTextGenerating"
              v-model="content"
              v-focus
              class="w-full flex-1 resize-none bg-transparent pr-2 text-sm leading-6 text-slate-300 outline-none scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300/20"
              placeholder="Start typing your note or right click here to get IA help tools..."
              @input="handleContentChanged"
            />
            <p
              v-if="isTextGenerating"
              class="animate-pulse text-center text-sm text-slate-400"
            >
              The llama is shouting something to us... 🦙
            </p>
          </div>
        </ScContextMenuTrigger>
      </ScContextMenu>
      <ScDialogFooter class="w-full">
        <button
          type="button"
          :disabled="!content"
          class="w-full bg-lime-400 py-4 text-center text-sm font-medium text-lime-950 outline-none hover:bg-lime-500 disabled:cursor-not-allowed disabled:bg-lime-700"
          @click="handleSaveNote"
        >
          Save note
        </button>
      </ScDialogFooter>
    </ScDialogContent>
  </ScDialog>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";

const emit = defineEmits<{
  onNoteCreated: [content: string];
}>();

const vFocus = {
  mounted: (el: HTMLElement) => el.focus(),
};

const shouldShowOnboarding = ref<boolean>(true);
const isDialogOpen = ref<boolean>(false);
const content = ref<string>("");
const prompt = ref<string>("");
const imageUrl = ref("");
const isTextGenerating = ref<boolean>(false);
const isImageGenerating = ref<boolean>(false);
const storyEventSource = ref<EventSource | null>(null);

function handleStartEditor() {
  shouldShowOnboarding.value = false;
}

function handleContentChanged() {
  if (content.value === "") {
    shouldShowOnboarding.value = true;
  }
}

function handleSaveNote() {
  if (content.value === "") {
    return;
  }

  emit("onNoteCreated", content.value);

  content.value = "";
  shouldShowOnboarding.value = true;
  toast.success("Note created with success!");
  isDialogOpen.value = false;
}

function handleClose() {
  shouldShowOnboarding.value = true;
  content.value = "";
  prompt.value = "";
  imageUrl.value = "";
  isImageGenerating.value = false;
  isTextGenerating.value = false;
  storyEventSource.value?.close();
}

const handleTextGenerate = () => {
  isTextGenerating.value = true;

  storyEventSource.value = new EventSource(
    `https://nottia-worker.caio-vinnicius2k.workers.dev/note?prompt=${encodeURIComponent(prompt.value)}`,
  );

  storyEventSource.value.onmessage = function (event) {
    if (event.data === "[DONE]") {
      storyEventSource.value?.close();
      return;
    }

    const data = JSON.parse(event.data);

    if (data && data.response) {
      isTextGenerating.value = false;
      content.value += data.response;
    }
  };
};

function handleImageGenerate(prompt: string = "One piece") {
  isImageGenerating.value = true;
  fetch("https://nottia-worker.caio-vinnicius2k.workers.dev/generate-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  })
    .then((response) => response.blob())
    .then((blob) => {
      imageUrl.value = URL.createObjectURL(blob);
      content.value = `![cover](${imageUrl.value})` + "\n" + content.value;
      isImageGenerating.value = false;
    })
    .catch((error) => {
      console.error("There was a problem:", error);
      isImageGenerating.value = false;
    });
}
</script>
