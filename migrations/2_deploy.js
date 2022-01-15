const fs = require('fs');

var SimpleToken = artifacts.require('SimpleToken');
var tozauNFT = artifacts.require('tozauNFT');

module.exports = async (deployer) => {
  await deployer.deploy(SimpleToken, 'tozau', 'TZU');
  await deployer.deploy(tozauNFT);

  let config = `
    module.exports = {
      'simpleTokenCA': '${SimpleToken.address}',
      'tozauNFTCA': '${tozauNFT.address}',
    };
  `;

  let data = JSON.stringify(config);
  fs.writeFileSync('address.config.js', JSON.parse(data));
};
