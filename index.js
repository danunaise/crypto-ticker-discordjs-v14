import { Client, Events,ActivityType, GatewayIntentBits } from 'discord.js';
import axios from 'axios';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);

  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin')
    .then(response => {
      console.log(response.data);
      const data = response.data[0];
      const current_price = data.current_price;
      const percentageprice24h = data.price_change_percentage_24h|| 0;
      const high_24h = data.high_24h;
      const low_24h = data.low_24h;
      const total_volume = data.total_volume;

      const arrayOfStatus = [
        `$${current_price} (${percentageprice24h.toFixed(2)})%`,
        `↗High 24h $${high_24h}`,
        `↘Low 24h $${low_24h}`,
        `Volume $${total_volume}`,
      ];

      let index = 0;
      setInterval(() => {
        if (index === arrayOfStatus.length) index = 0;
        const status = arrayOfStatus[index];
        client.user.setActivity(status, { type: ActivityType.Watching });
        index++;
      }, 5 * 1000); // 5 seconds

    }).catch(error => {
      console.error(error);
    })
});

// Log in to Discord with your client's token
client.login("youtokenhere");