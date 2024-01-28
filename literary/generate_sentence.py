import random
import MeCab
import MySQLdb

def generate_sentence():
    # Connect to the MySQL database
    db = MySQLdb.connect(host="localhost", user="your_username", passwd="your_password", db="your_database")
    cursor = db.cursor()

    # Select random rows from the articles table
    cursor.execute("SELECT raw FROM articles ORDER BY RAND() LIMIT 50")
    rows = cursor.fetchall()

    # Initialize MeCab
    m = MeCab.Tagger()

    # Process the raw text and generate a new sentence
    new_sentence = ""
    for row in rows:
        raw_text = row[0]
        node = m.parseToNode(raw_text)
        while node:
            if node.surface != "":
                new_sentence += node.surface
            node = node.next

    # Close the database connection
    cursor.close()
    db.close()

    # Return the new sentence
    return new_sentence

# Call the function and print the new sentence
print(generate_sentence())
