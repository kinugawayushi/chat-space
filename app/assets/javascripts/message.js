$(function(){  
  function buildHTML(message){
    if(message.image){
      var html =
      `<div class="chat-main__message" data-message-id=${message.id}>
      <div class="chat-main-message__info">
      <p class="chat-main-message__talker">
      ${message.use_name}
      </p>
      <p class="chat-main-message__data">
      ${message.created_at}
      </p>
      <p class="chat-main-message__text">
      ${message.content}
      </p>
      <img class="lower-message__image" src = ${message.image}>
      </div>
      </div>`
      return html;
    } else {
      var html =
      `<div class="chat-main__message" data-message-id=${message.id}>
      <div class="chat-main-message__info">
      <p class="chat-main-message__talker">
      ${message.user_name}
      </p>
      <p class="chat-main-message__data">
      ${message.created_at}
      </p>
      <p class="chat-main-message__text">
      ${message.content}
      </p>
      </div>
      </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main-messages').append(html);
      $('.chat-main-messages').animate({ scrollTop: $('.chat-main-messages')[0].scrollHeight });
      $('form')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.input-send-btn').prop('disabled', false);
    }); 
  })
  var reloadMessages = function(){
    var last_message_id = $('.chat-main__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
     if(messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i,message){
        insertHTML += buildHTML(message)
      });
      $('.chat-main-messages').append(insertHTML);
      $('.chat-main-messages').animate({ scrollTop: $('.chat-main-messages')[0].scrollHeight});
     }
    })
    .fails(function(){
      alert('error');
    });
  };
  if(document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }
});



