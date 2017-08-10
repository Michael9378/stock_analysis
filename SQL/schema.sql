
CREATE TABLE company_summary (
	company_symbol VARCHAR(15),
	company_name VARCHAR(75),
	company_lastSale FLOAT,
	company_marketCap VARCHAR(10),
	company_ipoYear INT,
	company_sector VARCHAR(50),
	company_industry VARCHAR(50),
	company_quoteUrl VARCHAR(45),
	PRIMARY KEY (company_symbol)
);

CREATE TABLE company_dailyStats (
	company_symbol VARCHAR(15),
	stats_date DATE,
	stats_open FLOAT,
	stats_close FLOAT,
	stats_high FLOAT,
	stats_low FLOAT,
	stats_volume INT,
	PRIMARY KEY (company_symbol, stats_date),
	FOREIGN KEY (company_symbol) REFERENCES company_summary (company_symbol)
		ON DELETE CASCADE
		ON UPDATE CASCADE	
);