// Sayfa yüklendiğinde önceki notları kontrol et ve göster
window.addEventListener('DOMContentLoaded', () => {
    // Daha önce kaydedilmiş notları al
    const savedNotes = JSON.parse(localStorage.getItem('dailyNotes')) || [];

    // Eğer kaydedilmiş notlar varsa, bunları ekranda göster
    const noteDisplay = document.getElementById('dailyNoteDisplay');
    savedNotes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note-item');
        
        const noteText = document.createElement('p');
        noteText.textContent = note;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Sil';
        deleteButton.classList.add('delete-btn');
        
        // Silme butonuna tıklanınca notu sil
        deleteButton.addEventListener('click', () => {
            deleteNote(index);
        });

        noteElement.appendChild(noteText);
        noteElement.appendChild(deleteButton);
        noteDisplay.appendChild(noteElement);
    });
});

// Not eklemek için formu dinle
document.getElementById('saveNoteForm').addEventListener('submit', (e) => {
    e.preventDefault();  // Formun sayfayı yenilemesini engelle

    const noteInput = document.getElementById('noteInput').value;

    // Eğer kullanıcı bir not yazmışsa, bunu sakla
    if (noteInput.trim() !== '') {
        // Daha önce kaydedilmiş notları al
        const savedNotes = JSON.parse(localStorage.getItem('dailyNotes')) || [];

        // Yeni notu ekle
        savedNotes.push(noteInput);

        // Yeni listeyi localStorage'a kaydet
        localStorage.setItem('dailyNotes', JSON.stringify(savedNotes));

        // Sayfada göster
        const noteDisplay = document.getElementById('dailyNoteDisplay');
        const newNoteElement = document.createElement('div');
        newNoteElement.classList.add('note-item');

        const noteText = document.createElement('p');
        noteText.textContent = noteInput;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Sil';
        deleteButton.classList.add('delete-btn');

        // Silme butonuna tıklanınca notu sil
        deleteButton.addEventListener('click', () => {
            deleteNote(savedNotes.length);  // Son eklenen notu sil
        });

        newNoteElement.appendChild(noteText);
        newNoteElement.appendChild(deleteButton);
        noteDisplay.appendChild(newNoteElement);

        // Not kutusunu temizle
        document.getElementById('noteInput').value = '';
    }
});

// Not silme fonksiyonu
function deleteNote(index) {
    // Daha önce kaydedilmiş notları al
    const savedNotes = JSON.parse(localStorage.getItem('dailyNotes')) || [];

    // Silinen notu diziden çıkar
    savedNotes.splice(index, 1);

    // Yeni listeyi localStorage'a kaydet
    localStorage.setItem('dailyNotes', JSON.stringify(savedNotes));

    // Sayfayı güncelle
    location.reload();
}
