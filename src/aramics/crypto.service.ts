import { Injectable } from "@nestjs/common";
import * as crypto from 'crypto'


@Injectable()
export class CryptoServie{
    encryptionKey = Buffer.from('0123456789abcdef0123456789abcdef', 'hex'); // 256-bit key
    iv = Buffer.from('abcdef9876543210abcdef9876543210', 'hex'); // 16-byte IV
    constructor(){}

    encrypt(text:string) {
        const cipher = crypto.createCipheriv('aes-256-cbc', this.encryptionKey, this.iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
}