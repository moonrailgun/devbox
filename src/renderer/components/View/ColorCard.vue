<template>
  <div class="color-card">
    <el-row>
      <el-col :span="24">
        <el-color-picker v-model="pickerColor" :show-alpha="showAlpha" :color-format="showAlpha?'rgb':'hex'"></el-color-picker>
        <el-button type="primary" plain @click="addColor()">添加到我的色卡</el-button>
        <span>{{pickerColor}}</span>
        <el-switch
          v-model="showAlpha"
          active-text="显示透明度">
        </el-switch>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <p>我的色卡</p>
        <div class="color-block" v-for="color in myColors">
          <div class="color-val" :style="{backgroundColor: color.val}" @click="selectColor(color)"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <p>选择颜色</p>
        <p>色值:{{selectedColor.val}}</p>
        <p>添加时间:{{selectedColor.createdAt}}</p>
        <p>备注:{{selectedColor.comments}}</p>
        <el-button type="primary" plain @click="removeColor(selectedColor.index)">移除</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        showAlpha: true,
        pickerColor: '',
        myColors: [],
        selectedColor: {},
        colorIndex: 1
      }
    },
    methods: {
      addColor () {
        this.myColors.push({
          index: ++this.colorIndex,
          val: this.pickerColor,
          createdAt: new Date().format('yyyy-MM-dd'),
          comments: ''
        })
        this.$set(this.$data, 'myColors', this.myColors)
        // this.myColors.push(this.color)
      },
      selectColor (color) {
        this.selectedColor = color
      },
      removeColor (index) {
        // TODO
      }
    }
  }
</script>

<style>
.color-card .el-color-picker {
  vertical-align: bottom;
}

.color-card .color-block {
  width: 20px;
  height: 20px;
  display: inline-block;
  cursor: pointer;
  margin: 2px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)
}
.color-card .color-block .color-val {
  width: 100%;
  height: 100%;
}

.el-color-dropdown {
  cursor: default;
}
</style>
