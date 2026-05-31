import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Switch
} from 'react-native';

const booksData = [
  {
    id: '1',
    title: 'Кобзар',
    author: 'Тарас Шевченко',
    category: 'Поезія',
    lang: 'UA',
    image: 'https://covers.openlibrary.org/b/id/8228691-L.jpg'
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    category: 'Dystopia',
    lang: 'EN',
    image: 'https://covers.openlibrary.org/b/id/7222246-L.jpg'
  },
  {
    id: '3',
    title: 'Гаррі Поттер і філософський камінь',
    author: 'J.K. Rowling',
    category: 'Fantasy',
    lang: 'EN',
    image: 'https://covers.openlibrary.org/b/id/7984916-L.jpg'
  },
  {
  id: '4',
  title: 'The Lord of the Rings: The Fellowship of the Ring',
  author: 'J.R.R. Tolkien',
  category: 'Fantasy',
  lang: 'EN',
  image: 'https://upload.wikimedia.org/wikipedia/en/8/8e/The_Fellowship_of_the_Ring_cover.gif'
},
  {
    id: '5',
    title: 'Фауст',
    author: 'Goethe',
    category: 'Classics',
    lang: 'EN',
    image: 'https://covers.openlibrary.org/b/id/8231996-L.jpg'
  },
  {
    id: '6',
    title: 'Захар Беркут',
    author: 'Іван Франко',
    category: 'Історичний роман',
    lang: 'UA',
    image: 'https://covers.openlibrary.org/b/id/11153223-L.jpg'
  },
  {
    id: '7',
    title: 'Мартін Іден',
    author: 'Jack London',
    category: 'Novel',
    lang: 'EN',
    image: 'https://covers.openlibrary.org/b/id/240727-L.jpg'
  },
  {
    id: '8',
    title: 'Тигролови',
    author: 'Іван Багряний',
    category: 'Adventure',
    lang: 'UA',
    image: 'https://covers.openlibrary.org/b/id/10958358-L.jpg'
  },
  {
    id: '9',
    title: 'Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    category: 'Detective',
    lang: 'EN',
    image: 'https://covers.openlibrary.org/b/id/8231856-L.jpg'
  },
  {
    id: '10',
    title: 'Лісова пісня',
    author: 'Леся Українка',
    category: 'Drama',
    lang: 'UA',
    image: 'https://covers.openlibrary.org/b/id/8235101-L.jpg'
  }
];

export default function App() {
  const [search, setSearch] = useState('');
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState('ALL');

  const theme = dark
    ? { bg: '#121212', card: '#1e1e1e', text: '#fff', sub: '#aaa', input: '#2a2a2a' }
    : { bg: '#f5f5f5', card: '#fff', text: '#000', sub: '#666', input: '#eee' };

  const filteredBooks = booksData.filter(book => {
    const matchSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.category.toLowerCase().includes(search.toLowerCase());

    const matchLang = lang === 'ALL' || book.lang === lang;

    return matchSearch && matchLang;
  });

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
        <Text style={{ color: theme.sub }}>{item.author}</Text>

        <View style={styles.tag}>
          <Text style={{ color: '#fff', fontSize: 12 }}>{item.category}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>

      
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme.text }]}>
          📚 Бібліотека
        </Text>

        <Switch value={dark} onValueChange={setDark} />
      </View>

     
      <TextInput
        placeholder="Пошук книги..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
        style={[styles.search, { backgroundColor: theme.input, color: theme.text }]}
      />

    
      <View style={styles.langRow}>

        <TouchableOpacity onPress={() => setLang('ALL')}>
          <Text style={[styles.langBtn, lang === 'ALL' && styles.active]}>ALL</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setLang('UA')}>
          <Text style={[styles.langBtn, lang === 'UA' && styles.active]}>UA</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setLang('EN')}>
          <Text style={[styles.langBtn, lang === 'EN' && styles.active]}>EN</Text>
        </TouchableOpacity>

      </View>

     
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },

  headerText: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  search: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },

  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },

  langBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#4b7bec',
    color: '#fff',
    borderRadius: 8,
    fontWeight: 'bold',
    overflow: 'hidden'
  },

  active: {
    backgroundColor: '#2d98da'
  },

  card: {
    flexDirection: 'row',
    marginBottom: 12,
    padding: 10,
    borderRadius: 12,
    elevation: 3
  },

  image: {
    width: 70,
    height: 100,
    borderRadius: 8,
    marginRight: 10
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  tag: {
    marginTop: 5,
    backgroundColor: '#4b7bec',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6
  }
});