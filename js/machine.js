$(document).ready(function() {
	$("#liste").on("change",function(){
		var zone = $("select#liste").val();
		$( "span" ).remove();
		$(".table").remove();
		$.ajax({
			url: 'json/machine.json',
			type: 'GET',
			dataType: 'json',
			cache: false,
			async: true
		})
		.done(function(data) {
			var machines=[];
			var cmpt = 0;
			for (j in data){
				if(data[j]["idZone"] == zone){
					machines[cmpt] = data[j];
					cmpt ++;
				}
			}
			var node;
			var numtable = 0;
			cmpt=5;
			for (machine in machines){
				if (cmpt % 5 == 0) {
					node = document.createElement("div"); 
					node.className = 'table';             
					node.innerHTML = 'table';
					$("#salle").append(node);
					numtable ++;
				};
				if(machines[machine]["idEtat"] == 3)
					$(".table:last-child").append("<span class='machineHs'>"+machines[machine]["idMachine"]+"</span>");
				else
					if (machines[machine]["idEtat"] == 2)
						$(".table:last-child").append("<span class='machineOccupee'>"+machines[machine]["idMachine"]+"</span>");
					else
						$(".table:last-child").append("<span class='machineLibre'>"+machines[machine]["idMachine"]+"</span>");
				cmpt++;
			}
			$('.machineLibre').click(function(){
				this.className = 'machineHs';
				var res = {};
				res.idMachine = $(this).html();
				res.idEtat = 3 ;
				console.log(res);

				$.ajax({
					data:JSON.stringify(res),
					type:'POST',
					url:'php/updateMachine.php',
					success:function(data){
						// Affichage si tout se passe bien
						console.log("Update ok");
					},
					error:function(data){
						console.log("Erreur update");
					}
				});
			});
			$('.machineHs').click(function(){
				this.className = 'machineLibre';
				var res = {};
				res.idMachine = $(this).html();
				res.idEtat = 1 ;
				console.log(res);

				$.ajax({
					data:JSON.stringify(res),
					type:'POST',
					url:'php/updateMachine.php',
					success:function(data){
						// Affichage si tout se passe bien
						console.log("Update ok");
					},
					error:function(data){
						console.log("Erreur update");
					}
				});
			});
		});
	});

});
