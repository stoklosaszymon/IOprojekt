namespace IOprojekt.Utils
{
    public class Utilities
    {
        public static void Assing<T>(T obj1, T obj2)
        {
            foreach (var prop in typeof(T).GetProperties())
            {
                prop.SetValue(obj1, prop.GetValue(obj2));
            }
        }
    }
}
