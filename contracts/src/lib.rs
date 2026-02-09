#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Address, Env, Symbol};

// Veritabanı anahtarlarımızı tanımlıyoruz (Tasarruf için kısa semboller)
const TOTAL_DONATIONS: Symbol = symbol_short!("total");
const TARGET_AMOUNT: Symbol = symbol_short!("target");
const RECIPIENT: Symbol = symbol_short!("owner");

#[contract]
pub struct SustainFund;

#[contractimpl]
impl SustainFund {
    // 1. Kampanyayı Başlatma Fonksiyonu
    pub fn initialize(env: Env, recipient: Address, target: u32) {
        // Eğer daha önce başlatılmadıysa ayarları kaydet
        if !env.storage().instance().has(&RECIPIENT) {
            env.storage().instance().set(&RECIPIENT, &recipient);
            env.storage().instance().set(&TARGET_AMOUNT, &target);
            env.storage().instance().set(&TOTAL_DONATIONS, &0u32);
        }
    }

    // 2. Bağış Yapma Fonksiyonu (Simüle edilmiş)
    pub fn donate(env: Env, amount: u32) -> u32 {
        // Mevcut toplamı al
        let current_total: u32 = env.storage().instance().get(&TOTAL_DONATIONS).unwrap_or(0);
        
        // Yeni bağışı ekle
        let new_total = current_total + amount;
        
        // Yeni toplamı kaydet
        env.storage().instance().set(&TOTAL_DONATIONS, &new_total);
        
        // Güncel toplamı geri döndür (Front-end'de göstermek için)
        new_total
    }

    // 3. Durumu Sorgulama Fonksiyonu
    pub fn get_status(env: Env) -> u32 {
        env.storage().instance().get(&TOTAL_DONATIONS).unwrap_or(0)
    }
}