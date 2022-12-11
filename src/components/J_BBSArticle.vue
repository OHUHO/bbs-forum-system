<template>
    <div>
        <div class="block" v-for="(b,index) in blockList" :key="index">
            <a class="title" href="#">{{b.title}}</a>
            <div class="contents">
                <img src="../assets/swipers/swiper2.jpg" v-if="b.imgUrl === '' ? false:true">
                <div class="col">
                    <a class="detail" href="#">{{b.contens}}</a>
                    <div class="other">
                        <div class="active">
                            <p class="row">
                                <img class="good" src="../assets/good.png">
                                <span class="num">10</span>
                            </p>
                            <p class="row">
                                <img class="comment" src="../assets/comment.png">
                                <span class="author">6</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BBSArticle",
    data(){
        return{
            blockList:[
                {id:1,title:'青年在选择职业时的考虑', contens:'自然本身给动物规定了它应该遵守的活动范围，动物也就安分地在这个范围内活动，而不试图越出这个范围，' +
                        '甚至不考虑有其它范围存在。神也给人指定了共同的目标──使人类和他自己趋于高尚，但是，神要人自己去寻找可以达到这个目标的手段；神让人在社会上选择' +
                        '一个最适合于他、最能使他和社会变得高尚的地位。', imgUrl: '../assets/swipers/swiper2.jpg'},
                {id:2,title:'青年在选择职业时的考虑', contens:'自然本身给动物规定了它应该遵守的活动范围，动物也就安分地在这个范围内活动，而不试图越出这个范围，' +
                        '甚至不考虑有其它范围存在。神也给人指定了共同的目标──使人类和他自己趋于高尚，但是，神要人自己去寻找可以达到这个目标的手段；神让人在社会上选择' +
                        '一个最适合于他、最能使他和社会变得高尚的地位。', imgUrl: ''},
                {id:3,title:'青年在选择职业时的考虑', contens:'自然本身给动物规定了它应该遵守的活动范围，动物也就安分地在这个范围内活动，而不试图越出这个范围，' +
                        '甚至不考虑有其它范围存在。神也给人指定了共同的目标──使人类和他自己趋于高尚，但是，神要人自己去寻找可以达到这个目标的手段；神让人在社会上选择' +
                        '一个最适合于他、最能使他和社会变得高尚的地位。', imgUrl: '../assets/swipers/swiper2.jpg'},
                {id:4,title:'青年在选择职业时的考虑', contens:'自然本身给动物规定了它应该遵守的活动范围，动物也就安分地在这个范围内活动，而不试图越出这个范围，' +
                        '甚至不考虑有其它范围存在。神也给人指定了共同的目标──使人类和他自己趋于高尚，但是，神要人自己去寻找可以达到这个目标的手段；神让人在社会上选择' +
                        '一个最适合于他、最能使他和社会变得高尚的地位。', imgUrl: ''},
                {id:5,title:'青年在选择职业时的考虑', contens:'自然本身给动物规定了它应该遵守的活动范围，动物也就安分地在这个范围内活动，而不试图越出这个范围，' +
                        '甚至不考虑有其它范围存在。神也给人指定了共同的目标──使人类和他自己趋于高尚，但是，神要人自己去寻找可以达到这个目标的手段；神让人在社会上选择' +
                        '一个最适合于他、最能使他和社会变得高尚的地位。', imgUrl: ''},
                {id:6,title:'青年在选择职业时的考虑', contens:'自然本身给动物规定了它应该遵守的活动范围，动物也就安分地在这个范围内活动，而不试图越出这个范围，' +
                        '甚至不考虑有其它范围存在。神也给人指定了共同的目标──使人类和他自己趋于高尚，但是，神要人自己去寻找可以达到这个目标的手段；神让人在社会上选择' +
                        '一个最适合于他、最能使他和社会变得高尚的地位。', imgUrl: '../assets/swipers/swiper2.jpg'}
            ],

        }
    },
}
</script>

<style scoped>
    .block{
        width: 1190px;
        background-color: whitesmoke;
        margin: 3px 0px;
        border-radius: 5px;
        padding: 5px;
    }
    .title{
        font-weight: bold;
        text-decoration: none;
        color: #222226;
    }
    .title:hover{
        text-decoration: underline;
    }
    .col{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        font-size: 14px;
    }
    .detail{
        position: relative;
        top: 0;
        text-decoration: none;
        color: black;
    }
    .other{
        position: relative;
        bottom: 0;
    }
    .active{
        display: flex;
        flex-direction: row;
    }
    .row{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin-right: 20px;
    }
    .good,.comment{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
    }
    .num{
        position: relative;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .contents{
        display: flex;
        flex-direction: row;
    }
    img{
        width: 120px;
        height: 80px;
        padding: 5px;
        margin-top: 5px;
    }

</style>