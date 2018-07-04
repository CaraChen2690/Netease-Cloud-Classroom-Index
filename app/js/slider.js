import $ from 'jquery';

// 轮播图
export class Slider{
	constructor(containerId,imgClass,btnClass){
		this.container = $(containerId);
		this.imgList = this.container.find('a');
		this.btnList = this.container.find('li');
		this.imgClass = imgClass;
		this.btnClass = btnClass;
		this.index = 0;
		this.timer = null;
		this.cancelAndAgain();
		this.autoplay();
	};

	// 自动运行
	autoplay(){
		let self = this;
		self.timer = setInterval(function(){
            self.nextImg();
        }, 5000);
        self.clickBtn();
	};

	// 图片变化
	nextImg(){
		this.index += 1;
		if(this.index > this.imgList.length - 1){
			this.index = 0;
		};
		this.moveImg(this.imgList, this.index);
        this.moveBtn(this.btnList, this.index);
	};

	// 图片改变
	moveImg(imgList,index){
		this.imgList.removeClass(this.imgClass);
        this.imgList.eq(index).addClass(this.imgClass);
	};

	// 按钮改变
	moveBtn(btnList,index){
		this.btnList.removeClass(this.btnClass);
		this.btnList.eq(index).addClass(this.btnClass);
	};

	// 点击按钮
	clickBtn(){
		let self = this;
		for(let i = 0; i < self.btnList.length; i++){
			self.btnList.eq(i).click(function(){
				self.index = i;
				self.moveImg(self.imgList, self.index);
		        self.moveBtn(self.btnList, self.index);
			});
		};
	};

	cancelAndAgain(){
		let self = this;
		self.container.hover(function(){
			clearInterval(self.timer);
		},function(){
			self.autoplay();
		});
	};
};

