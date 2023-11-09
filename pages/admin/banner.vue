<template>
    <v-data-table
        :headers="headers"
        :items="itemList"
        class="elevation-1"
        @click:row="editItem"
        disable-sort
        item-key="no"
    >
    <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title>배너 관리</v-toolbar-title>
            <v-divider class="mx-5" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="1000px" style="overflow:hidden;">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">배너 추가</v-btn>
                </template>
                <v-card style="overflow:hidden;">
                    <v-app-bar flat >
                        <v-card-title>
                            배너 {{ formTitle }}
                        </v-card-title>
                    </v-app-bar>
                    <v-col class="ma-0 pa-4">
                        <v-row class="ma-0 pa-0">
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    v-model="editedItem.title"
                                    label="타이틀"
                                    hide-details
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="ma-0 pa-0">
                            <v-col cols="12" sm="6" md="4">
                                <v-select
                                    label="타입"
                                    v-model="editedItem.type"
                                    :items="['링크', '전화', '없음']"
                                    hide-details
                                    outlined
                                    dense
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row class="ma-0 pa-0">
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    v-model="editedItem.content"
                                    label="연결정보"
                                    hide-details
                                    outlined
                                    dense
                                    :disabled="editedItem.type == '없음'"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="ma-0 pa-0">
                            <v-col cols="12" sm="6" md="6">
                                <v-img 
                                    v-if="editedItem.image != null"
                                    :src="editedItem.image != null ? profileImageUrl(editedItem.image) : '@/assets/image/photo_camara_back.png'"
                                    aspect-ratio="19/6"
                                    contain
                                    height="200"
                                    class="ma-4 pa-0"
                                    @click="showImageDetail(0)"
                                />
                                
                                <v-file-input 
                                    v-model="profileImage"
                                    label="이미지"
                                    placeholder="이미지 파일을 선택해주세요"
                                    @change="selectFile"
                                    accept="image/*"
                                    hide-details
                                    outlined
                                    dense
                                >
                                </v-file-input>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-img 
                                    v-if="editedItem.m_image != null"
                                    :src="editedItem.m_image != null ? profileImageUrl(editedItem.m_image) : '@/assets/image/photo_camara_back.png'"
                                    aspect-ratio="192/60"
                                    contain
                                    height="200"
                                    class="ma-4 pa-0"
                                    @click="showImageDetail(1)"
                                />
                                
                                <v-file-input 
                                    v-model="profileImageM"
                                    label="모바일 이미지"
                                    placeholder="모바일 이미지 파일을 선택해주세요"
                                    @change="selectFileM"
                                    accept="image/*"
                                    hide-details
                                    outlined
                                    dense
                                >
                                </v-file-input>
                            </v-col>
                        </v-row>
                        <v-row class="ma-0 pa-0">
                            <v-col cols="12" sm="6" md="4">
                                <v-autocomplete
                                    v-model="editedItem.priority"
                                    label="우선순위"
                                    :items="[1,2,3,4,5,6,7,8,9,10]"
                                    hide-details
                                        outlined
                                        dense
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-footer class="ma-0 pa-2 justify-end">
                        <!-- <v-card-actions>
                            <v-spacer></v-spacer> -->
                            <v-btn v-if="editedIndex != -1" color="error" @click="dialogDelete = true">삭제</v-btn>
                            <v-btn class="ml-2" color="warning" @click="close">취소</v-btn>
                            <v-btn class="ml-2" color="success" @click="save">저장</v-btn>
                        <!-- </v-card-actions> -->
                    </v-footer>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">정말 삭제 하시겠습니까?</span>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn color="blue darken-1" text @click="closeDelete" >Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Delete</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="showDetailPopup" class="elevation-0" style="overflow:none;">
                <ImageDetail ref="imageDetail" :items="imageList" :currentIndex="currentIndex" @close-detail="closeDetail"/>
            </v-dialog>
        </v-toolbar>
    </template>
    <template v-slot:[`item.image`]="{item}">
        <v-img class="ma-0 pa-0"
            aspect-ratio="192/60"
            :src="item.image != null ? profileImageUrl(item.image[0]) : ''"
            contain
            height="150"
        >
        </v-img>
    </template>
  </v-data-table>
</template>
<script>
import Moment from 'moment'
import ImageDetail from '@/components/admin/ImageDetail.vue'
export default {
    components: {ImageDetail},
    layout:'Admin',
    data() {
        return {
            searchWord:'',
            editedIndex: -1,
            editedItem: {
                no:"",
            },
            defaultItem: {
                no:"",
            },
            dialog: false,
            dialogDelete: false,
            headers: [
                { text: "배너번호", value: "no", width:'5%' , align: "center"},
                { text: "이미지", value: "image" , width:'20%', align: "center"},
                { text: "제목", value: "title" , width:'20%', align: "center"},
                { text: "타입", value: "type" , width:'5%', align: "center"},
                { text: "연결정보", value: "content" , width:'20%', align: "center"},
                { text: "우선순위", value: "priority", width:'5%' , align: "center"},
                { text: "생성일", value: "cd" , width:'8%', align: "center"},
                { text: "편집일", value: "ed" , width:'8%', align: "center"},
            ],
            itemList: [],
            hostUrl: process.env.BASE_URL,
            profileImage: null,
            profileImageM: null,
            imageList: [],
            currentIndex: 0,
            showDetailPopup: false,
        };
    },
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? '등록' : '수정'
        },
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
    },
    mounted() {
        // document.body.setAttribute('data-app', true)
        this.selecItem()//처음 데이터 조회
    },
    methods: {
        closeDetail() {
            this.showDetailPopup = !this.showDetailPopup
            this.imageList = []
            this.currentIndex = 0
        },
        showImageDetail(index) {
            if (index == 0) {
                if (this.editedItem.image) {this.imageList.push(this.editedItem.image)}
                if (this.editedItem.m_image) {this.imageList.push(this.editedItem.m_image)}
            }else if (index == 1) {
                if (this.editedItem.image) {this.imageList.push(this.editedItem.image)}
                if (this.editedItem.m_image) {this.imageList.push(this.editedItem.m_image)}
                if (this.imageList.length == 1) this.currentIndex = 0
                else this.currentIndex = 1
            }
            this.showDetailPopup = !this.showDetailPopup
        },
        selectFile() {
            console.log("this.profileImage : ", this.profileImage)
            if (this.profileImage != null)
                this.editedItem.image = URL.createObjectURL(this.profileImage)
            else this.editedItem.image = null
        },
        selectFileM() {
            if (this.profileImageM != null)
                this.editedItem.m_image = URL.createObjectURL(this.profileImageM)
            else this.editedItem.m_image = null
        },
        async editItem (item) {
            this.editedIndex = this.itemList.indexOf(item)
            this.editedItem = Object.assign({}, item)
            console.log(item)
            if (item.image.length > 0) this.profileImage = await this.convertUrl(this.profileImageUrl(item.image[0]))
            else this.editedItem.image = null
            if (item.m_image.length > 0) this.profileImageM = await this.convertUrl(this.profileImageUrl(item.m_image[0]))
            else this.editedItem.m_image = null
            this.dialog = true
        },
        async deleteItemConfirm () {
            await this.deleteItem()
            await this.selecItem()
            this.closeDelete()
        },
        close () {
            this.dialog = false
            this.editedItem = { ...this.defaultItem }
            this.editedIndex = -1
            this.profileImage = null
            this.profileImageM = null
            console.log("close : ", this.editedItem)
        },
        closeDelete () {
            this.dialog = false
            this.dialogDelete = false
            this.editedItem = { ...this.defaultItem }
            this.editedIndex = -1
            this.profileImage = null
            this.profileImageM = null
        },
        async save (){
            
            if (this.editedIndex > -1) {
                await this.updateItem()
                await this.selecItem()
                this.close()
            }else {
                await this.insertItem()
                await this.selecItem()
                this.close()
            }
        },

        // select db
        async selecItem() {
            this.itemList = []
            let param = {
                table:"banner",
                conditions:[
                        {q:"!=",f:"status",v:'삭제'},
                        {q:"order",f:"cd",o:"DESC"}
                    ]
                }
            await this.$axios.post('/admin/select', param).then((res) => {
                
                if(Object.keys(res.data).length > 0) {
                    this.itemList = res.data
                    this.itemList.forEach(async (data)=>{
                        if (!this.validateVariableExist(data.image)) {
                            data.image = JSON.parse(data.image)
                        }
                        if (!this.validateVariableExist(data.m_image)) {
                            data.m_image = JSON.parse(data.m_image)
                        }
                        data.cd = Moment(data.cd).format('YYYY-MM-DD HH:mm')
                        data.ed = Moment(data.ed).format('YYYY-MM-DD HH:mm')

                        console.log(this.profileImage)
                    })
                }
            }).catch((err) => {
                console.log('에러!!', err)
            })

        },

        // insert db
        async insertItem() {
            let param = {}
            param['table']="banner"
            param['priority'] = this.editedItem.priority
            param['title'] = this.editedItem.title
            param['content'] = this.editedItem.content
            param['type'] = this.editedItem.type
            param['status'] = '활성'
            // param['image'] = this.editedItem.image
            if (this.profileImage == null) {param['image'] = JSON.stringify([])}
            if (this.profileImageM == null) {param['m_image'] = JSON.stringify([])}
            
            await this.$axios.post('/admin/insert', param).then(async (res) => {
                this.editedItem.no = res.data[0].no
                if (!this.validateVariableExist(this.profileImage)) {
                    await this.updateImage(this.profileImage, 'image')
                }
                if (!this.validateVariableExist(this.profileImageM)) {
                    await this.updateImage(this.profileImageM, 'm_image')
                }
                alert('저장되었습니다.')
                
            }).catch((err) => {
                console.log('에러!!', err)
            })
        },

        // update db
        async updateItem() {
            //param setting
            let param = {  }
            param['no']=this.editedItem.no
            param['table'] = 'banner'
            param['priority'] = this.editedItem.priority
            param['title'] = this.editedItem.title
            param['content'] = this.editedItem.content
            param['type'] = this.editedItem.type
            param['status'] = '활성'
            // param['image'] = this.editedItem.image
            param['conditions'] = [{q:"=",f:"no",v:this.editedItem.no}]
            console.log("updateItem : ", param)
            await this.$axios.post('/admin/update', param).then(async (res) => {
                console.log(this.profileImage, this.profileImageM)
                if (!this.validateVariableExist(this.profileImage)) {
                    await this.updateImage(this.profileImage, 'image')
                }
                if (!this.validateVariableExist(this.profileImageM)) {
                    await this.updateImage(this.profileImageM, 'm_image')
                }
                alert('저장되었습니다.')
            }).catch((err) => {
                console.log('에러!!', err)
            }) 
        },

        // delete db
        async deleteItem() {
            let param = {  }
            param['no']=this.editedItem.no
            param['table']="banner"
            param['status'] = "삭제"
            param['conditions'] = [{q:"=",f:"no",v:this.editedItem.no}]
            await this.$axios.post('/admin/update', param).then((res) => {
                
            }).catch((err) => {
                console.log('에러!!', err)
            })
        },
        async updateImage(obj, text) {
            let formData = new FormData()
            formData.append('imageParam', text)
            formData.append('no', this.editedItem.no)
            formData.append('table', 'banner')
            formData.append('conditions', JSON.stringify([{q:"=",f:"no",v:this.editedItem.no}]))
            if (Array.isArray(obj)) {
                for (const file of obj) 
                    formData.append('files', file)
            } else {
                if (obj != null)
                    formData.append('files', obj)
            }
            
            await this.$axios.post('/admin/updateMultipart', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(res => {
                console.log("updateImage")
            }).catch(err => {
                console.log("multipart error : ", err);
            })
        },
        profileImageUrl(url) {
            if (!url) return null
            if(url.includes('http')) return url
            else return this.hostUrl+url
        },
        validateVariableExist(value) {
            return (value == null || value == undefined || value == '' || value == '[]' || value == [])
        },
        async convertUrl(url){
            const response =  await fetch(url);
            const data =  await response.blob();
            const ext = await url.split(".").pop();
            const filename = await url.split("/").pop()
            const metadata = { type: `image/${ext}` };
            return new File([data], filename, metadata);
        },
    }
}
</script>
<style scoped>
</style>