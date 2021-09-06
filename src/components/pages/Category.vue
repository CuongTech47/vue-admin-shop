<template>
  <div>
    <div class="content">
      <div class="container-fluid">
        
        <!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
        <div class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20">
         <p class="_title0">Category <Button ><Icon type="md-add" /> Add tag</Button></p>

          <div class="_overflow _table_div">
            <table class="_table">
              <!-- TABLE TITLE -->
              <tr>
                <th>Id</th>
                <th>Category Name</th>
                <th>Category Status</th>
                <th>Created at</th>
                <th>Action</th>
              </tr>
              <!-- TABLE TITLE -->


              <!-- ITEMS -->
              <tr v-for="(cat , i) in cats" :key="i" >
                <td>{{cat.category_id}}</td>
                <td class="_table_name">{{cat.category_name}}</td>
                <td v-if="cat.category_status==0" >An</td>
                <td v-if="cat.category_status==1" >Hien thi</td>
                 <td>{{cat.created_at}}</td>
                <td>
                    <Button type="info" size="small"  >Edit</Button>
					<Button type="error" size="small"  >Delete</Button>
                  <!-- <el-button type="primary" icon="el-icon-edit" @click="showEditModal(cat,i)" size="mini">Edit</el-button>
                  <el-button type="danger" icon="el-icon-delete" @click="showDeletingModal(cat, i)" size="mini">Clear</el-button> --> 
                </td>
              </tr>
            </table>
          </div>
        </div>
        <!-- ADD CATEGORY MODAL -->
        <Modal
			v-model="addModal"
			title="Add tag"
			:mask-closable="false"
			:closable="false"
			>
			<Input v-model="data.tagName" placeholder="Add tag name"  />

			<div slot="footer">
				<Button type="default" @click="addModal=false">Close</Button>
				<Button type="primary" @click="addTag" :disabled="isAdding" :loading="isAdding">{{isAdding ? 'Adding..' : 'Add tag'}}</Button>
			</div>

		</Modal>
        <!-- Edit CATEGORY MODAL -->
        <Modal
			v-model="editModal"
					title="Edit tag"
					:mask-closable="false"
					:closable="false"

					>
					<Input v-model="editData.tagName" placeholder="Edit tag name"  />

					<div slot="footer">
						<Button type="default" @click="editModal=false">Close</Button>
						<Button type="primary" @click="editTag" :disabled="isAdding" :loading="isAdding">{{isAdding ? 'Editing..' : 'Edit tag'}}</Button>
					</div>

		</Modal>

        
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return {
            data:{
            category_name:"",
            category_desc:"",
            category_status:"",
        },
        formLabelWidth: '120px',
        addModal: false,
        editModal:false,
        isAdding:false,
        cats:[],
        editData:{
            category_name:"",
            category_desc:"",
            category_status:"",
        },
        index : -1,
        deletingIndex: -1,
        isDeleing : false,
        showDeleteModal: false,
        deleteItem: {}, 
         
      }
    },

    methods:{
      s(mes , title="Great!") {
        this.$notify({
          title: title,
          message: mes,
          type: 'success'
        });
      },

      w(mes , title="Oops!") {
        this.$notify({
          title: title,
          message: mes,
          type: 'warning'
        });
      },

      swr(mes="Something went wrong! Please try again" , title="Oops") {
        this.$notify.error({
          title: title,
          message: mes
        });
      },

      e(mes , title="Oops!") {
        this.$notify.error({
          title: title,
          message: mes
        });
      },
        
      async add_category(){
        if(this.data.category_name.trim()=="") return this.e("Category Name is required")
        if(this.data.category_desc.trim()=="") return this.e("Category Desc is required")
        if(this.data.category_status.trim()=="") return this.e("Category Status is required")
        const res = await axios.post('http://localhost:8080/api/v1/category',this.data)
        if(res.status===201){
          this.cats.unshift(res.data)
          this.s('them thanh cong')
          this.addModal = false
          this.data = ""
        }else{
            if(res.status==422){
              console.log(res.data)
              if(res.data.errors.tagName){
                this.e(res.data.errors.tagName[0])
              }
              
            }else{
              this.swr()
          }
         
        }
          
      },
      async edit_category(){
        if(this.editData.category_name.trim()=="") return this.e("Category Name is required")
        if(this.editData.category_desc.trim()=="") return this.e("Category Desc is required")
        if(this.editData.category_status.trim()=="") return this.e("Category Status is required")
        const res = await axios.patch(`http://localhost:5000/api/v1/category/update/${this.editData._id}`,this.editData)
        if(res.status===200){
          this.cats[this.index].category_name = this.editData.category_name
          this.cats[this.index].category_desc = this.editData.category_desc
          this.cats[this.index].category_status = this.editData.category_status
          this.s('sua thanh cong')
          this.editModal = false
          this.editData = ""
         
        }else{
          if(res.status===422){
            console.log(res.data.message)
            /* if(res.data.errors.category_name)
              this.i(res.data.errors.category_name[0])  */
           }else{
             this.swr()
          }
         
        }
          
      },
        async delete_category(){
          this.isDeleing = true
          const res = await axios.patch(`http://localhost:5000/api/v1/category/update/${this.deleteItem._id}`,this.deleteItem)
          if(res.status===200){
            this.cats.splice(this.deletingIndex,1)
            this.s('Xoa!')
          }else{
            this.swr()
          }
          /* this.isDeleing = false
          this.showDeleteModal = false */
      },
        showDeletingModal(cat, i){
          const deleteModalObj  =  {
            showDeleteModal: true, 
            deleteUrl : 'app/delete_tag', 
            data : cat, 
            deletingIndex: i, 
            isDeleted : false,
          }
          this.$store.commit('setDeletingModalObj', deleteModalObj)
          console.log('delete method called')
          // this.deleteItem = tag
          // this.deletingIndex = i
          // this.showDeleteModal = true
      }, 
      showEditModal(cat, index){
			let obj = {
				_id : cat._id, 
				category_name : cat.category_name,
        category_desc:cat.category_desc,
        category_status:cat.category_status,

			}
			this.editData = obj
			this.editModal = true
			this.index = index
		}, 
      
      /* add_category_product(){
      let newCategory = {
        category_name:this.data.category_name,
        category_desc:this.data.category_desc,
        category_status:this.data.category_status
      }
      axios.post('http://localhost:5000/api/v1/category/create',newCategory)
          .then(res=>{
            console.log(res)
            this.msg=""
            this.$router.push('/category')
          },msg => {
            console.log(msg.response)
            this.err.response.data.error
          })
    }, */
    },
    async created() {
        const res = await axios.get('http://localhost:8080/api/v1/category')
        if(res.status==200){
          
          this.cats = res.data.data
        }else{
          this.swr()
        }
      }
}
</script>
