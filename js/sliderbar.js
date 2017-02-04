$(function() {
	var SliderModule = (function(){
		var pb = {};
		pb.el = $("#slider");
		pb.items = {
			panel: pb.el.find("li")
		}	
		//variable necesarias
		var SliderInterval,
			currentSlider=0,
			nextSlider=1,
			lengthSlider=pb.items.panel.length;


		//constructor
		pb.init=function (settings) {
			//activamos el slider
			SliderInit();

			$('#slider-control').on('click', 'li' ,function(e){
				var $this = $(this);
				console.log($this.index());
				if(currentSlider!=$this.index()){
				 chargePanel($this.index());
				};
			});
		}

		var SliderInit=function() {
			SliderInterval=setInterval(pb.startSlider,6000);
		}
		pb.startSlider=function(){
			var panels=pb.items.panel;
			var contrls=$("#slider-control li");

			if(nextSlider >= lengthSlider){
				nextSlider=0;
				currentSlider= lengthSlider-1;

			}
			//efectos
			contrls.removeClass('active').eq(nextSlider).addClass('active');
			panels.eq(currentSlider).fadeOut('slow');
			panels.eq(nextSlider).fadeIn('slow');
			//actualizamos
			currentSlider = nextSlider;
			nextSlider += 1;

		}
		//funcion control slider
		var chargePanel= function(id){

			clearInterval(SliderInterval);
			var panels=pb.items.panel;
			var contrls=$("#slider-control li");
			//comprobando disponibilida
			if(id >= lengthSlider){
				id = 0;
			}else if (id<0){
				id=lengthSlider-1;
			}
			//efectos 
			contrls.removeClass('active').eq(id).addClass('active');

			panels.eq(currentSlider).fadeOut('slow');
			panels.eq(id).fadeIn('slow');

			//actualizamos
			currentSlider = id;
			nextSlider =id+1;
			//reativamos es intervalo
			SliderInit();

		}
		return pb;
	}());
	SliderModule.init();

});

