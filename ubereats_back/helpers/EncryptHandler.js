const crypto = require('crypto');

const secret = 'pppppppppppppppppppppppppppppppp';

exports.encrypt = (password) => {
  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(secret), iv);
  const encryptedPassword = Buffer.concat([
    cipher.update(password),
    cipher.final(),
  ]);
  return { iv: iv.toString('hex'), password: encryptedPassword.toString('hex') };
};

exports.decrypt = (encryption) => {
  const decypher = crypto.createDecipheriv(
    'aes-256-ctr',
    Buffer.from(secret),
    Buffer.from(encryption.iv, 'hex'),
  );
  const decrypted = Buffer.concat([
    decypher.update(Buffer.from(encryption.password, 'hex')),
    decypher.final(),
  ]);
  return decrypted.toString();
};
