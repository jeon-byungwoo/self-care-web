<template>
	<v-col class="ma-0 pa-0">
		<v-row class="ma-0 pa-0 menubar elevation-2" v-if="editor">
			<v-icon
				class="menubar__button"
				:disabled="!editor.can().chain().focus().undo().run()"
				@click="editor.chain().focus().undo().run()"
			>mdi-undo</v-icon>
			<v-icon
				class="menubar__button"
				:disabled="!editor.can().chain().focus().redo().run()"
				@click="editor.chain().focus().redo().run()"
			>mdi-redo</v-icon>
			<v-icon
				class="menubar__button"
				:class="{ 'is-active': editor.isActive('bold') }"
				@click="editor.chain().focus().toggleBold().run()"
				:disabled="!editor.can().chain().focus().toggleBold().run()"
			>mdi-format-bold</v-icon>
			<v-icon
				class="menubar__button"
				:class="{ 'is-active': editor.isActive('italic') }"
				@click="editor.chain().focus().toggleItalic().run()"
				:disabled="!editor.can().chain().focus().toggleItalic().run()"
			>mdi-format-italic</v-icon>
			<v-icon
				class="menubar__button"
				:class="{ 'is-active': editor.isActive('strike') }"
				@click="editor.chain().focus().toggleStrike().run()"
				:disabled="!editor.can().chain().focus().toggleStrike().run()"
			>mdi-format-strikethrough-variant</v-icon>
			<v-icon
				class="menubar__button"
				:class="{ 'is-active': editor.isActive('underline') }"
				@click="editor.chain().focus().toggleUnderline().run()"
				:disabled="!editor.can().chain().focus().toggleUnderline().run()"
			>mdi-format-underline</v-icon>
			<v-icon
				class="menubar__button"
				:class="{ 'is-active': editor.isActive('code') }"
				@click="editor.chain().focus().toggleCode().run()"
				:disabled="!editor.can().chain().focus().toggleCode().run()"
			>mdi-xml</v-icon>
			<!-- <v-icon
				class="menubar__button"
				@click="editor.chain().focus().unsetAllMarks().run()"
			>mdi-xml</v-icon> -->
			<v-icon
				class="menubar__button"
				:class="{ 'is-active': editor.isActive('paragraph') }"
				@click="editor.chain().focus().setParagraph().run()"
			>mdi-format-pilcrow</v-icon>
			<v-icon
				class="menubar__button"
				:class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
				@click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
			>mdi-format-header-1</v-icon>
			<v-icon
				class="menubar__button"
				:class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
				@click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
			>mdi-format-header-2</v-icon>
			<v-icon
				class="menubar__button"
				:class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
				@click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
			>mdi-format-header-3</v-icon>
			<v-icon
				class="menubar__button"
				:class="{ 'is-active': editor.isActive('bulletList') }"
				@click="editor.chain().focus().toggleBulletList().run()"
			>mdi-format-list-bulleted</v-icon>
			<v-icon
				class="menubar__button"
				:class="{ 'is-active': editor.isActive('orderedList') }"
				@click="editor.chain().focus().toggleOrderedList().run()"
			>mdi-format-list-numbered</v-icon>
			<!-- <v-icon
				class="menubar__button"
				@click="editor.chain().focus().toggleBlockquote().run()"
			>mdi-format-quote-close</v-icon> -->
			<v-icon
				class="menubar__button"
				@click="editor.chain().focus().setHorizontalRule().run()"
			>mdi-minus</v-icon>
			<v-icon
				class="menubar__button"
				@click="fileSelectPopup = !fileSelectPopup"
			>mdi-image-outline</v-icon>
		</v-row>
		<editor-content :editor="editor" />
		<v-dialog content-class="file_selector" v-model="fileSelectPopup" persistent>
			<v-card class="ma-0 pa-4 ">
				<v-card-title class="justify-space-between">
					Add Image
					<v-icon @click="cancelClick">mdi-close</v-icon>
				</v-card-title>
				<v-col class="ma-0 pa-0 " v-if="imgObj.src != null && imgObj.alt != null">
					<v-row class="ma-0 pa-0 align-center justify-center">
						<img :src="imgObj.src" :alt="imgObj.alt" class="ma-4 pa-0" style="width:fit-content; height:fit-content; overflow:auto"/>
					</v-row>
					<v-row class="ma-0 pa-0 align-center justify-center">
						<v-text-field 
							hide-details
							class="ma-0 pa-0"
							label="Alt Text"
							style="max-width: 200px;"
							v-model="imgObj.alt"
							dense
						>
						</v-text-field>
					</v-row>
				</v-col>
				<v-divider class="mx-0 my-4" color="black" v-if="imgObj.src != null && imgObj.alt != null"/>
				<v-row class="ma-0 px-0" >
					<v-file-input 
						class="ma-0 pa-0"
						:show-size="1000"
						v-model="selectedImg"
						@change="fileAdded"
						hide-details
						dense
						label="파일을 추가해주세요."
						placeholder="파일을 추가해주세요."
					>
					</v-file-input>
				</v-row>
				<v-card-actions class="ma-0 pa-0 justify-end">
					<v-btn color="blue darken-1" text @click="cancelClick" >Cancel</v-btn>
					<v-btn color="blue darken-1" text @click="addImage">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>	
	</v-col>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import Blockquote from '@tiptap/extension-blockquote'

export default {
	components: {EditorContent},
	props: ['text' ],
	data() {
		return {
			content: '',
			table: null,
			editor: null,
			fileSelectPopup: false,
			selectedImg: null,
			imgObj: {
				src: null,
				alt: null,
			},
			hostUrl: process.env.BASE_URL,
		}
	},
	mounted() {
		this.setEditor()
	},
	methods: {
		setEditor() {
			this.editor = new Editor({
				content: this.content,
				extensions: [
					StarterKit,
					Image,
					Underline,
					Blockquote
				],
			})
			this.editor.on('update', this.onUpdate)
		},
		setContents(text, table) {
			this.content = text
			this.table = table
			this.editor.commands.setContent(this.content)
		},
		async addImage() {
			let formData = new FormData()
            formData.append('table', this.table)
            formData.append('files', this.selectedImg)
            
			await this.$axios.post('/admin/insertMultipart', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(res => {
                if (res.data.length > 0) {
					this.imgObj.src = this.profileImageUrl(res.data[0])
					
                    this.imageAddToContent()
                }
            }).catch(err => {
                console.log("insertMultipart Error ", err)
            })	
		},
		imageAddToContent() {
			this.$emit('image-add-to-content', { src: this.profileImageUrl(this.imgObj.src), alt: this.imgObj.alt }); 
			
			this.content += `<img src="${this.profileImageUrl(this.imgObj.src)}" alt="${this.imgObj.alt}">`
			
			this.editor.commands.setContent(this.content)
			
			this.imgObj.src = null
			this.imgObj.alt = null
			this.selectedImg = null
			this.fileSelectPopup = !this.fileSelectPopup
		},
		cancelClick() {
			this.imgObj.src = null
			this.imgObj.alt = null
			this.selectedImg = null
			this.fileSelectPopup = !this.fileSelectPopup
		},
		profileImageUrl(url) {
            if(url.includes('http')) return url
            else return this.hostUrl+url
        },
		async convertUrl(url){
            const response =  await fetch(url);
            const data =  await response.blob();
            const ext = await url.split(".").pop();
            const filename = await url.split("/").pop();
            const metadata = { type: `image/${ext}` };
            return new File([data], filename, metadata);
        },
		async fileAdded() {
			this.imgObj.src = URL.createObjectURL(this.selectedImg)
			this.imgObj.alt = this.selectedImg.name
		},
		onUpdate ({ editor }) {
			// const json = editor.getJSON()
			const text = editor.getHTML()
			this.content = text
		}
	}
}
</script>
<style scopted>
.main_editor {
	width: 100%;
	height: 600px;
}
.menubar {
	background-color: white;
	
}
.menubar__button {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  background: rgba(0, 0, 0, 0);
  border: 0px solid rgba(0, 0, 0, 0.5);
  color: #000;
  padding: 0.4rem 0.4rem;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;
}
.menubar__button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.menubar__button.is-active {
  background-color: rgba(0, 0, 0, 0.2);
}
.file_selector {
	min-width: 600px;
	width: 600px;
	max-width: fit-content;
}
</style>
