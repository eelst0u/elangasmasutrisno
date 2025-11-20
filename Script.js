
        document.addEventListener('DOMContentLoaded', () => {
            // Jelaskan Kodingan ini apa: Pastikan seluruh HTML sudah selesai dimuat sebelum menjalankan kode JavaScript.
            
            // 1. Ambil elemen-elemen DOM yang dibutuhkan
            // Jelaskan Kodingan ini apa: Ambil elemen layar.
            const display = document.getElementById('display');
            // Jelaskan Kodingan ini apa: Ambil semua tombol.
            const buttons = document.querySelectorAll('.btn-calc'); 
            
            // Jelaskan Kodingan ini apa: Variabel untuk menyimpan angka yang sedang diketik.
            let currentInput = ''; 
            // Jelaskan Kodingan ini apa: Variabel untuk operator yang dipilih.
            let operator = null;   
            // Jelaskan Kodingan ini apa: Variabel untuk angka pertama (sebelum operator).
            let previousValue = null; 
            // Jelaskan Kodingan ini apa: Status, apakah kita sedang menunggu angka kedua.
            let waitingForSecondOperand = false; 

            // Jelaskan Kodingan ini apa: Fungsi sederhana untuk menampilkan nilai di layar.
            const updateDisplay = (value) => {
                display.value = value || '0';
            };

            // Jelaskan Kodingan ini apa: Fungsi yang mengurus input angka dan titik.
            const handleNumberInput = (number) => {
                if (waitingForSecondOperand) {
                    // Jika baru klik operator, angka baru akan menggantikan angka lama
                    currentInput = number;
                    waitingForSecondOperand = false;
                } else {
                    // Mengurus titik desimal agar tidak ada dua titik
                    if (number === '.') {
                        if (!currentInput.includes('.')) {
                            currentInput += number;
                        }
                    } else {
                        // Memastikan angka tidak dimulai dengan '0' kecuali angka itu sendiri
                        currentInput = (currentInput === '0' && number !== '.') ? number : currentInput + number;
                    }
                }
                updateDisplay(currentInput);
            };

            // Jelaskan Kodingan ini apa: Fungsi yang mengurus input operator (+, -, *, /).
            const handleOperator = (nextOperator) => {
                const inputValue = parseFloat(currentInput);

                // Jika operator ditekan dua kali, ganti operator saja (misal: 5 + * jadi 5 * )
                if (operator && waitingForSecondOperand) {
                    operator = nextOperator;
                    return;
                }

                if (previousValue === null) {
                    // Menyimpan angka pertama (operand 1)
                    previousValue = inputValue;
                } else if (operator) {
                    // Jika ada operator lama, hitung dulu hasilnya (misal: 10 + 5 + 3)
                    const result = calculate(previousValue, inputValue, operator);
                    
                    // Simpan hasil hitungan sebagai angka pertama yang baru
                    previousValue = parseFloat(result.toFixed(8)); 
                    currentInput = String(previousValue);
                    updateDisplay(currentInput);
                }

                // Siap untuk memasukkan angka kedua
                waitingForSecondOperand = true;
                operator = nextOperator;
            };

            // Jelaskan Kodingan ini apa: Fungsi inti yang menjalankan perhitungan matematika sebenarnya.
            const calculate = (num1, num2, op) => {
                if (op === '+') return num1 + num2;
                if (op === '-') return num1 - num2;
                if (op === '*') return num1 * num2;
                if (op === '/') {
                    // Peringatan jika dibagi nol!
                    if (num2 === 0) {
                        alert("Error: Tidak bisa dibagi dengan nol!");
                        return 0;
                    }
                    return num1 / num2;
                }
                if (op === '%') {
                    // Logika persen
                    if (previousValue === null) {
                        return num1 / 100; // Misal: 50%
                    }
                    return (num1 * num2) / 100; // Misal: 100 + 10%
                }
                return num2; 
            };

            // Jelaskan Kodingan ini apa: Fungsi Tombol Clear (C).
            const clearAll = () => {
                currentInput = '';
                operator = null;
                previousValue = null;
                waitingForSecondOperand = false;
                updateDisplay(currentInput);
            };

            // Jelaskan Kodingan ini apa: Fungsi Tombol Delete (DEL).
            const deleteLast = () => {
                if (currentInput.length > 0 && !waitingForSecondOperand) {
                    currentInput = currentInput.slice(0, -1);
                    if (currentInput === '') {
                        updateDisplay('0');
                    } else {
                        updateDisplay(currentInput);
                    }
                }
            };

            // 2. Tambahkan event listener ke setiap tombol
            // Jelaskan Kodingan ini apa: Bagian yang mendengarkan klik pada semua tombol.
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const { value } = button.dataset; 

                    // Jelaskan Kodingan ini apa: Memutuskan aksi apa yang harus dilakukan berdasarkan nilai tombol yang diklik.
                    if (value === 'C') {
                        clearAll();
                    } else if (value === 'DEL') {
                        deleteLast();
                    } else if (['+', '-', '*', '/', '%'].includes(value)) {
                        handleOperator(value);
                    } else if (value === '=') {
                        // Aksi tombol Sama Dengan
                        if (operator && previousValue !== null && currentInput !== '') {
                            // Jelaskan Kodingan ini apa: Hitung hasil akhir.
                            const result = calculate(previousValue, parseFloat(currentInput), operator);
                            
                            // Tampilkan hasil dan reset untuk perhitungan berikutnya
                            previousValue = parseFloat(result.toFixed(8));
                            currentInput = String(previousValue);
                            operator = null;
                            waitingForSecondOperand = true; 
                            updateDisplay(currentInput);
                        }
                    } else {
                        // Jika bukan tombol fungsi, berarti itu angka/titik
                        handleNumberInput(value);
                    }
                });
            });

            // Jelaskan Kodingan ini apa: Tampilkan '0' di layar saat pertama kali kalkulator dimuat.
            updateDisplay(currentInput); 
        });
   