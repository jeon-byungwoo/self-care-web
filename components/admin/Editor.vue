<template>
  
	<!-- Use the component in the right place of the template -->
	<tiptap-vuetify 
		output-format="json"
		v-model="content" 
		:extensions="extensions"
		:toolbar-attributes="{color:'red'}"
		
	/>
  
</template>

<script>
// import the component and the necessary extensions
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Image,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from 'tiptap-vuetify'
import FileSelector from './FileSelector.vue'
export default {
  // specify TiptapVuetify component in "components"
  components: { TiptapVuetify, FileSelector },
  props: ['text' ],
  data: () => ({
	// declare extensions you want to use
	extensions: [
		History,
		Blockquote,
		Link,
		Underline,
		Strike,
		Italic,
		ListItem,
		BulletList,
		OrderedList,
		[
			Heading,
			{
			options: {
				levels: [1, 2, 3]
			}
			}
		],
		Bold,
		Link,
		[
			Image, {
				options: {
					imageSources: [
						{ component: FileSelector, name: 'File Selector' }
					]
				}
			}
		],
		Code,
		HorizontalRule,
		Paragraph,
		HardBreak
	],
	// starting editor's content
	content: '',
	table: null
  }),
  mounted() {
	console.log("table : ", this.table)
  },
  methods: {
	setContent(text) {
		this.content = text
	},
	// selectImage() {
	// // When doing an asynchronous upload, you can set the src property to the value provided by the server (backend).
	//     this.$emit('select-file', { src: '/path/to/image.jpg', alt: 'Uploaded image' });
	// }
  }
}
</script>
<style scoped>
.main_editor {
	width: 100%;
	height: 600px;
	display: flex;
}
</style>