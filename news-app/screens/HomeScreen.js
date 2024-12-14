import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { ListItem } from "../components/ListItem";
import { useState, useEffect } from "react";
import Constants from "expo-constants";

const URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${Constants.expoConfig.extra.newsApiKey}`;

export const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const res = await fetch(URL).then((res) => res.json());
      setArticles(res.articles);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => {
          return (
            <ListItem
              imageURL={item.urlToImage}
              title={item.title}
              author={item.author}
              onPress={() => navigation.navigate("Article", { article: item })}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
});
