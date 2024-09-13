function downloadBook(bookName) {
    alert(bookName + ' ni yuklab olish boshlandi!');
    window.location.href = '/downloads/' + bookName;
}

function readBook(bookName) {
    alert(bookName + ' ni o‘qish boshlanadi!');
    window.open('/read/' + bookName, '_blank'); 
}
