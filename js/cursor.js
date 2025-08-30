const follower = document.querySelector('.follower');

  document.addEventListener('mousemove', e => {
        // кружок плавно движется к курсору
        follower.style.left = (e.pageX) + 'px';
        follower.style.top = (e.pageY) + 'px';
});